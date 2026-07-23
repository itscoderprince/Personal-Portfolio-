'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { ProjectType } from '@/type/index';
import { updateAvatarAction } from '../actions/projects';
import {
    Plus,
    Trash2,
    Edit,
    ArrowUp,
    ArrowDown,
    Upload,
    Link as LinkIcon,
    Save,
    Lock,
    LogOut,
    X,
    FileText,
    Image as ImageIcon,
    ExternalLink,
    AlertCircle,
    Loader2,
} from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

// ── Shadcn UI Components ───────────────────────────────────────────────────────
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { CustomToast } from '@/components/ui/CustomToast';

type StatusMsg = { type: 'success' | 'error'; text: string } | null;

export default function AdminPage() {
    // ── Authentication State ───────────────────────────────────────────────────
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passcode, setPasscode] = useState('');
    const [authError, setAuthError] = useState('');

    // ── Projects State ─────────────────────────────────────────────────────────
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [hasUnsaved, setHasUnsaved] = useState(false);
    const [activeTab, setActiveTab] = useState<'projects' | 'assets'>('projects');
    const [statusMsg, setStatusMsg] = useState<StatusMsg>(null);
    const [isSaving, setIsSaving] = useState(false);

    // ── Add / Edit Modal State ─────────────────────────────────────────────────
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formTitle, setFormTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [formLink, setFormLink] = useState('');
    const [formImgSrc, setFormImgSrc] = useState('');
    const [formTags, setFormTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState('');
    const [formFeatures, setFormFeatures] = useState<string[]>([]);
    const [newFeature, setNewFeature] = useState('');
    const [isUploadingProjectImg, setIsUploadingProjectImg] = useState(false);

    // ── Delete Confirmation Dialog State ───────────────────────────────────────
    const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // ── Media Assets State ─────────────────────────────────────────────────────
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState('');
    const [avatarMsg, setAvatarMsg] = useState<StatusMsg>(null);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

    const [assetFile, setAssetFile] = useState<File | null>(null);
    const [uploadedAssetUrl, setUploadedAssetUrl] = useState('');
    const [assetMsg, setAssetMsg] = useState<StatusMsg>(null);
    const [isUploadingAsset, setIsUploadingAsset] = useState(false);
    const [copied, setCopied] = useState(false);

    // ── Initialization & Effects ───────────────────────────────────────────────
    useEffect(() => {
        fetch('/api/projects', { cache: 'no-store' })
            .then((res) => res.json())
            .then((data) => {
                if (data.success && Array.isArray(data.projects)) {
                    setProjects(data.projects);
                }
            })
            .catch(() => {});

        if (sessionStorage.getItem('admin_authenticated') === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (!avatarFile) return;
        const url = URL.createObjectURL(avatarFile);
        setAvatarPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [avatarFile]);

    const showStatus = useCallback((type: 'success' | 'error', text: string) => {
        setStatusMsg({ type, text });
    }, []);

    // ── Auth Handlers ──────────────────────────────────────────────────────────
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (passcode.toLowerCase() === 'admin') {
            setIsAuthenticated(true);
            sessionStorage.setItem('admin_authenticated', 'true');
            setAuthError('');
        } else {
            setAuthError('Invalid passcode.');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('admin_authenticated');
        setPasscode('');
    };

    // ── Project Modal Handlers ─────────────────────────────────────────────────
    const openModal = (index: number | null) => {
        if (index !== null) {
            const p = projects[index];
            setEditingIndex(index);
            setFormTitle(p.title);
            setFormDescription(p.description || '');
            setFormLink(p.projectLink);
            setFormImgSrc(p.imgSrc);
            setFormTags([...(p.tags || [])]);
            setFormFeatures([...(p.features || [])]);
        } else {
            setEditingIndex(null);
            setFormTitle('');
            setFormDescription('');
            setFormLink('');
            setFormImgSrc('');
            setFormTags([]);
            setFormFeatures([]);
        }
        setNewTag('');
        setNewFeature('');
        setIsModalOpen(true);
    };

    const saveForm = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formTitle.trim() || !formLink.trim()) {
            showStatus('error', 'Title and Project URL are required.');
            return;
        }

        const data: ProjectType = {
            title: formTitle.trim(),
            description: formDescription.trim(),
            projectLink: formLink.trim(),
            imgSrc: formImgSrc.trim() || '/images/uploads/placeholder.png',
            tags: formTags,
            features: formFeatures,
        };

        const updated = [...projects];
        if (editingIndex !== null) updated[editingIndex] = data;
        else updated.push(data);

        setProjects(updated);
        setIsModalOpen(false);

        // Real-time persist to MongoDB
        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updated),
            });
            const resData = await res.json();
            if (resData.success) {
                setHasUnsaved(false);
                showStatus('success', editingIndex !== null ? 'Project updated in MongoDB!' : 'Project added to MongoDB!');
            } else {
                setHasUnsaved(true);
                showStatus('error', resData.message || 'Save to MongoDB failed.');
            }
        } catch (err: unknown) {
            setHasUnsaved(true);
            const message = err instanceof Error ? err.message : 'Error saving to MongoDB.';
            showStatus('error', message);
        }
    };

    // ── Delete Confirmation Handlers ───────────────────────────────────────────
    const openDeleteDialog = (index: number) => {
        setDeletingIndex(index);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (deletingIndex === null) return;
        const targetProject = projects[deletingIndex];
        if (!targetProject) return;

        setIsDeleting(true);
        const updated = projects.filter((_, i) => i !== deletingIndex);
        setProjects(updated);

        try {
            const res = await fetch(`/api/projects?title=${encodeURIComponent(targetProject.title)}`, {
                method: 'DELETE',
            });
            const resData = await res.json();
            if (resData.success) {
                setHasUnsaved(false);
                showStatus('success', `"${targetProject.title}" deleted from MongoDB!`);
            } else {
                await fetch('/api/projects', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updated),
                });
                setHasUnsaved(false);
                showStatus('success', `"${targetProject.title}" deleted from MongoDB!`);
            }
        } catch (err: unknown) {
            setHasUnsaved(true);
            const message = err instanceof Error ? err.message : 'Failed to delete from MongoDB.';
            showStatus('error', message);
        } finally {
            setIsDeleting(false);
            setIsDeleteDialogOpen(false);
            setDeletingIndex(null);
        }
    };

    const moveProject = async (index: number, dir: 'up' | 'down') => {
        if (dir === 'up' && index === 0) return;
        if (dir === 'down' && index === projects.length - 1) return;
        const arr = [...projects];
        const swap = dir === 'up' ? index - 1 : index + 1;
        [arr[index], arr[swap]] = [arr[swap], arr[index]];
        setProjects(arr);

        try {
            await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(arr),
            });
            setHasUnsaved(false);
        } catch {
            setHasUnsaved(true);
        }
    };

    const persistProjects = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(projects),
            });
            const data = await res.json();
            if (data.success) {
                setHasUnsaved(false);
                showStatus('success', 'Projects synced to MongoDB Atlas!');
            } else {
                showStatus('error', data.message || 'Save failed.');
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'An error occurred.';
            showStatus('error', message);
        } finally {
            setIsSaving(false);
        }
    };

    // ── Tag & Feature Handlers ─────────────────────────────────────────────────
    const addTag = () => {
        const t = newTag.trim();
        if (t && !formTags.includes(t)) {
            setFormTags(p => [...p, t]);
            setNewTag('');
        }
    };

    const addFeature = () => {
        const f = newFeature.trim();
        if (f && !formFeatures.includes(f)) {
            setFormFeatures(p => [...p, f]);
            setNewFeature('');
        }
    };

    // ── Media Upload Handlers ──────────────────────────────────────────────────
    const handleProjectImgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsUploadingProjectImg(true);
        const fd = new FormData();
        fd.append('image', file);
        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: fd,
            });
            const data = await res.json();
            if (data.success && data.url) {
                setFormImgSrc(data.url);
                showStatus('success', data.message || 'Image uploaded successfully!');
            } else {
                showStatus('error', data.message || 'Upload failed.');
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Upload failed.';
            showStatus('error', message);
        } finally {
            setIsUploadingProjectImg(false);
        }
    };

    const handleAvatarSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!avatarFile) return;
        setIsUploadingAvatar(true);
        setAvatarMsg(null);
        const fd = new FormData();
        fd.append('avatar', avatarFile);
        try {
            const res = await updateAvatarAction(fd);
            if (res.success) {
                setAvatarMsg({ type: 'success', text: 'Profile avatar replaced successfully!' });
                setAvatarFile(null);
            } else {
                setAvatarMsg({ type: 'error', text: res.message || 'Upload failed.' });
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Upload failed.';
            setAvatarMsg({ type: 'error', text: message });
        } finally {
            setIsUploadingAvatar(false);
        }
    };

    const handleAssetSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!assetFile) return;
        setIsUploadingAsset(true);
        setAssetMsg(null);
        const fd = new FormData();
        fd.append('image', assetFile);
        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: fd,
            });
            const data = await res.json();
            if (data.success && data.url) {
                setUploadedAssetUrl(data.url);
                setAssetMsg({ type: 'success', text: data.message || 'Asset uploaded successfully!' });
                setAssetFile(null);
            } else {
                setAssetMsg({ type: 'error', text: data.message || 'Upload failed.' });
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Upload failed.';
            setAssetMsg({ type: 'error', text: message });
        } finally {
            setIsUploadingAsset(false);
        }
    };

    const copyUrl = async () => {
        await navigator.clipboard.writeText(uploadedAssetUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // ── Login Screen ──────────────────────────────────────────────────────────
    if (!isAuthenticated) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-neutral-950 p-4 text-white">
                <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(79,70,229,0.12),transparent)]" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-sm rounded-2xl border border-neutral-800 bg-neutral-900/80 backdrop-blur-2xl shadow-2xl p-8 space-y-6 text-center"
                >
                    <div className="space-y-3">
                        <span className="inline-flex p-3.5 rounded-2xl bg-indigo-600/10 border border-indigo-600/20 text-indigo-500">
                            <Lock className="size-6" />
                        </span>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
                            <p className="text-neutral-400 text-xs mt-1">Enter your passcode to continue</p>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={passcode}
                            onChange={e => setPasscode(e.target.value)}
                            className="text-center text-2xl tracking-[0.3em] font-mono h-12 bg-neutral-950 border-neutral-800 focus-visible:ring-indigo-600"
                            autoFocus
                        />
                        <AnimatePresence>
                            {authError && (
                                <motion.p
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="text-red-400 text-xs flex items-center justify-center gap-1.5"
                                >
                                    <AlertCircle className="size-3.5" /> {authError}
                                </motion.p>
                            )}
                        </AnimatePresence>
                        <Button type="submit" className="w-full h-11 font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/25">
                            Enter Dashboard
                        </Button>
                    </form>
                </motion.div>
            </main>
        );
    }

    // ── Main Dashboard ────────────────────────────────────────────────────────
    return (
        <main className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-indigo-600 selection:text-white pb-20">
            {/* Global Custom Toast Notification */}
            {statusMsg && (
                <CustomToast
                    message={statusMsg.text}
                    type={statusMsg.type}
                    onClose={() => setStatusMsg(null)}
                />
            )}

            {/* Top Navigation */}
            <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-xl px-4 lg:px-8 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-indigo-600/10 border border-indigo-600/20 text-indigo-500">
                        <Lock className="size-4" />
                    </span>
                    <div>
                        <h1 className="font-bold text-sm leading-none">Portfolio Admin</h1>
                        <p className="text-[10px] text-neutral-400 mt-1 flex items-center gap-1">
                            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Connected to MongoDB Atlas
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" asChild className="border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-300">
                        <a href="/" target="_blank" className="flex items-center gap-1.5 text-xs">
                            <ExternalLink className="size-3.5" /> View Site
                        </a>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-neutral-400 hover:text-white hover:bg-neutral-800 text-xs">
                        <LogOut className="size-3.5" /> Logout
                    </Button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar Navigation */}
                <aside className="lg:col-span-3 space-y-6">
                    <nav className="p-1.5 rounded-2xl border border-neutral-800 bg-neutral-900/50 space-y-1">
                        <button
                            onClick={() => setActiveTab('projects')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition ${
                                activeTab === 'projects'
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                            }`}
                        >
                            <FileText className="size-4" /> Projects Manager
                        </button>
                        <button
                            onClick={() => setActiveTab('assets')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition ${
                                activeTab === 'assets'
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                            }`}
                        >
                            <ImageIcon className="size-4" /> Avatar & Media Assets
                        </button>
                    </nav>

                    <div className="p-4 rounded-2xl border border-neutral-800 bg-neutral-900/30 text-xs text-neutral-400 space-y-2 leading-relaxed">
                        <span className="font-semibold text-neutral-200 block uppercase tracking-wider text-[10px]">Cloud Sync</span>
                        <p>• Projects update instantly in <code className="text-indigo-400">MongoDB Atlas</code>.</p>
                        <p>• Images are hosted on <code className="text-indigo-400">Cloudinary CDN</code>.</p>
                    </div>
                </aside>

                {/* Main Content Area */}
                <section className="lg:col-span-9 space-y-6">
                    {/* Projects Tab */}
                    {activeTab === 'projects' && (
                        <div className="space-y-6">
                            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-5">
                                <div>
                                    <h2 className="text-lg font-bold">Manage Projects</h2>
                                    <p className="text-neutral-400 text-xs mt-0.5">Add, edit, reorder or delete portfolio projects</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button onClick={() => openModal(null)} className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold h-9 px-4 rounded-xl shadow-md shadow-indigo-600/25">
                                        <Plus className="size-4" /> Add Project
                                    </Button>
                                    <Button
                                        onClick={persistProjects}
                                        disabled={isSaving || !hasUnsaved}
                                        variant="outline"
                                        className="border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-xs h-9 px-4 rounded-xl disabled:opacity-40"
                                    >
                                        {isSaving ? <><Loader2 className="size-4 animate-spin" /> Saving…</> : <><Save className="size-4" /> Save Order</>}
                                    </Button>
                                </div>
                            </div>

                            {/* Projects List */}
                            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 overflow-hidden">
                                {projects.length === 0 ? (
                                    <div className="p-16 text-center text-neutral-500 text-sm">
                                        <Plus className="size-8 mx-auto mb-3 opacity-30" />
                                        No projects found in MongoDB. Click <strong>Add Project</strong> to create one.
                                    </div>
                                ) : (
                                    <div className="divide-y divide-neutral-800/60">
                                        {projects.map((project, index) => (
                                            <motion.div
                                                key={`${project.title}-${index}`}
                                                layout
                                                className="flex items-center gap-4 p-4 hover:bg-neutral-900/80 transition"
                                            >
                                                {/* Reorder Buttons */}
                                                <div className="flex flex-col gap-1 shrink-0">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        onClick={() => moveProject(index, 'up')}
                                                        disabled={index === 0}
                                                        className="text-neutral-500 hover:text-white hover:bg-neutral-800 disabled:opacity-20"
                                                    >
                                                        <ArrowUp className="size-3.5" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon-sm"
                                                        onClick={() => moveProject(index, 'down')}
                                                        disabled={index === projects.length - 1}
                                                        className="text-neutral-500 hover:text-white hover:bg-neutral-800 disabled:opacity-20"
                                                    >
                                                        <ArrowDown className="size-3.5" />
                                                    </Button>
                                                </div>

                                                {/* Thumbnail */}
                                                <div className="relative size-14 rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 shrink-0">
                                                    <Image src={project.imgSrc} alt={project.title} fill className="object-cover" unoptimized />
                                                </div>

                                                {/* Details */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-sm truncate text-white">{project.title}</h3>
                                                    {project.description && (
                                                        <p className="text-xs text-neutral-400 truncate mt-0.5">{project.description}</p>
                                                    )}
                                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                                        {project.tags.slice(0, 4).map((tag, i) => (
                                                            <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-800 border border-neutral-700/60 text-neutral-300 font-medium">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <Button variant="outline" size="icon-sm" asChild className="border-neutral-800 bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-white">
                                                        <a href={project.projectLink} target="_blank" title="View Demo">
                                                            <ExternalLink className="size-3.5" />
                                                        </a>
                                                    </Button>
                                                    <Button variant="outline" size="icon-sm" onClick={() => openModal(index)} className="border-neutral-800 bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-white" title="Edit">
                                                        <Edit className="size-3.5" />
                                                    </Button>
                                                    <Button variant="outline" size="icon-sm" onClick={() => openDeleteDialog(index)} className="border-neutral-800 bg-neutral-950 hover:bg-red-950/40 hover:border-red-900/50 text-neutral-400 hover:text-red-400" title="Delete">
                                                        <Trash2 className="size-3.5" />
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Media Assets Tab */}
                    {activeTab === 'assets' && (
                        <div className="space-y-6">
                            <div className="border-b border-neutral-800 pb-5">
                                <h2 className="text-lg font-bold">Avatar & Media Assets</h2>
                                <p className="text-neutral-400 text-xs mt-0.5">Upload profile avatar or media assets for project thumbnails</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Profile Avatar Card */}
                                <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="p-2.5 rounded-xl bg-indigo-600/10 text-indigo-500 border border-indigo-600/20">
                                            <ImageIcon className="size-5" />
                                        </span>
                                        <div>
                                            <h3 className="font-semibold text-sm">Update Profile Avatar</h3>
                                            <p className="text-neutral-400 text-xs">Replaces profile avatar image</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleAvatarSubmit} className="space-y-4">
                                        <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-neutral-800 hover:border-indigo-500/50 rounded-xl cursor-pointer bg-neutral-950/50 hover:bg-neutral-950 transition text-center group">
                                            <Upload className="size-6 text-neutral-500 group-hover:text-indigo-400 transition mb-2" />
                                            <span className="text-xs text-neutral-300 font-medium">Click to select new avatar image</span>
                                            <span className="text-[10px] text-neutral-500 mt-1">WEBP, PNG, JPG</span>
                                            <input type="file" accept="image/*" onChange={e => setAvatarFile(e.target.files?.[0] || null)} className="hidden" />
                                        </label>

                                        {avatarPreview && (
                                            <div className="flex items-center gap-3 p-3 rounded-xl border border-neutral-800 bg-neutral-950">
                                                <div className="relative size-10 rounded-full overflow-hidden border border-neutral-700">
                                                    <Image src={avatarPreview} alt="Preview" fill className="object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0 text-xs">
                                                    <p className="font-medium text-neutral-200 truncate">{avatarFile?.name}</p>
                                                    <p className="text-neutral-500 text-[10px]">{((avatarFile?.size || 0) / 1024).toFixed(1)} KB</p>
                                                </div>
                                                <Button type="button" variant="ghost" size="icon-sm" onClick={() => { setAvatarFile(null); setAvatarPreview(''); }} className="text-neutral-500 hover:text-white">
                                                    <X className="size-4" />
                                                </Button>
                                            </div>
                                        )}

                                        {avatarMsg && (
                                            <p className={`text-xs ${avatarMsg.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                                                {avatarMsg.text}
                                            </p>
                                        )}

                                        <Button type="submit" disabled={!avatarFile || isUploadingAvatar} className="w-full font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl">
                                            {isUploadingAvatar ? <><Loader2 className="size-4 animate-spin" /> Uploading…</> : 'Replace Avatar'}
                                        </Button>
                                    </form>
                                </div>

                                {/* Generic Cloudinary Asset Uploader */}
                                <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="p-2.5 rounded-xl bg-indigo-600/10 text-indigo-500 border border-indigo-600/20">
                                            <FileText className="size-5" />
                                        </span>
                                        <div>
                                            <h3 className="font-semibold text-sm">Upload Project Media Asset</h3>
                                            <p className="text-neutral-400 text-xs">Uploads directly to Cloudinary CDN</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleAssetSubmit} className="space-y-4">
                                        <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-neutral-800 hover:border-indigo-500/50 rounded-xl cursor-pointer bg-neutral-950/50 hover:bg-neutral-950 transition text-center group">
                                            <Upload className="size-6 text-neutral-500 group-hover:text-indigo-400 transition mb-2" />
                                            <span className="text-xs text-neutral-300 font-medium">Click to select asset file</span>
                                            <span className="text-[10px] text-neutral-500 mt-1">PNG, JPG, WEBP, SVG</span>
                                            <input type="file" accept="image/*" onChange={e => setAssetFile(e.target.files?.[0] || null)} className="hidden" />
                                        </label>

                                        {assetFile && (
                                            <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-800 bg-neutral-950 text-xs">
                                                <span className="truncate text-neutral-300">{assetFile.name}</span>
                                                <Button type="button" variant="ghost" size="icon-sm" onClick={() => setAssetFile(null)} className="text-neutral-500 hover:text-white">
                                                    <X className="size-4" />
                                                </Button>
                                            </div>
                                        )}

                                        {assetMsg && (
                                            <p className={`text-xs ${assetMsg.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                                                {assetMsg.text}
                                            </p>
                                        )}

                                        <Button type="submit" disabled={!assetFile || isUploadingAsset} className="w-full font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl">
                                            {isUploadingAsset ? <><Loader2 className="size-4 animate-spin" /> Uploading…</> : 'Upload Image'}
                                        </Button>
                                    </form>

                                    {uploadedAssetUrl && (
                                        <div className="p-3 rounded-xl border border-neutral-800 bg-neutral-950 space-y-2">
                                            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">CDN URL</span>
                                            <div className="flex items-center gap-2">
                                                <Input readOnly value={uploadedAssetUrl} className="bg-neutral-900 border-neutral-800 font-mono text-xs text-indigo-400 h-8" />
                                                <Button size="sm" onClick={copyUrl} className="bg-neutral-800 hover:bg-neutral-700 text-xs h-8">
                                                    {copied ? 'Copied!' : 'Copy'}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div>

            {/* ── Add / Edit Project Form Modal ────────────────────────────────────── */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-10 w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[88vh] text-white overflow-hidden"
                        >
                            {/* Floating Close Button */}
                            <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 z-30 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white"
                            >
                                <X className="size-4" />
                            </Button>

                            <form onSubmit={saveForm} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                                {/* Basic Info */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Project Title *</Label>
                                            <Input
                                                required
                                                value={formTitle}
                                                onChange={e => setFormTitle(e.target.value)}
                                                placeholder="e.g. Prayas by Aarya Foundation Website"
                                                className="bg-neutral-950 border-neutral-800 rounded-xl"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Live Demo URL *</Label>
                                            <div className="relative">
                                                <LinkIcon className="absolute left-3 top-2.5 size-4 text-neutral-500" />
                                                <Input
                                                    required
                                                    type="url"
                                                    value={formLink}
                                                    onChange={e => setFormLink(e.target.value)}
                                                    placeholder="https://example.com"
                                                    className="pl-9 bg-neutral-950 border-neutral-800 rounded-xl font-mono text-xs text-indigo-400"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Description</Label>
                                        <Textarea
                                            value={formDescription}
                                            onChange={e => setFormDescription(e.target.value)}
                                            placeholder="Project features, architecture, and tech highlights..."
                                            rows={3}
                                            className="bg-neutral-950 border-neutral-800 rounded-xl resize-none"
                                        />
                                    </div>
                                </div>

                                {/* Thumbnail Upload & Link Card */}
                                <div className="p-4 rounded-2xl border border-neutral-800 bg-neutral-950/40 space-y-3">
                                    <Label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">Thumbnail Image</Label>

                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                                        <div className="lg:col-span-7 space-y-3">
                                            <label className="flex flex-col items-center justify-center gap-1.5 p-4 rounded-xl border-2 border-dashed border-neutral-800 hover:border-indigo-500/50 bg-neutral-950 hover:bg-neutral-900 cursor-pointer transition text-center group">
                                                {isUploadingProjectImg ? (
                                                    <Loader2 className="size-5 text-indigo-400 animate-spin" />
                                                ) : (
                                                    <Upload className="size-5 text-neutral-500 group-hover:text-indigo-400 transition" />
                                                )}
                                                <span className="text-xs text-neutral-400 group-hover:text-neutral-200 transition font-medium">
                                                    {isUploadingProjectImg ? 'Uploading image to Cloudinary...' : 'Click to Upload Image to Cloudinary'}
                                                </span>
                                                <input type="file" accept="image/*" onChange={handleProjectImgUpload} className="hidden" />
                                            </label>

                                            <div className="flex items-center gap-2 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2">
                                                <LinkIcon className="size-4 text-neutral-500 shrink-0" />
                                                <input
                                                    type="text"
                                                    value={formImgSrc}
                                                    onChange={e => setFormImgSrc(e.target.value)}
                                                    placeholder="Or paste Cloudinary / Image URL..."
                                                    className="flex-1 bg-transparent outline-none text-xs text-neutral-300 placeholder:text-neutral-600 font-mono"
                                                />
                                            </div>
                                        </div>

                                        <div className="lg:col-span-5 flex items-center justify-center">
                                            {formImgSrc ? (
                                                <div className="relative aspect-video w-full max-h-36 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-md">
                                                    <Image src={formImgSrc} alt="Preview" fill className="object-cover" unoptimized />
                                                </div>
                                            ) : (
                                                <div className="aspect-video w-full max-h-36 rounded-xl border border-neutral-800 bg-neutral-950/40 flex flex-col items-center justify-center text-neutral-600 text-xs">
                                                    <ImageIcon className="size-6 mb-1 opacity-40" />
                                                    No Thumbnail Selected
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Tags & Features */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="p-4 rounded-2xl border border-neutral-800 bg-neutral-950/40 space-y-3">
                                        <Label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">Technologies & Tags</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                value={newTag}
                                                onChange={e => setNewTag(e.target.value)}
                                                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                                                placeholder="e.g. Next.js"
                                                className="bg-neutral-950 border-neutral-800 text-xs rounded-xl"
                                            />
                                            <Button type="button" onClick={addTag} size="sm" variant="secondary" className="rounded-xl">
                                                Add
                                            </Button>
                                        </div>
                                        {formTags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 pt-1">
                                                {formTags.map(tag => (
                                                    <span key={tag} className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-300 font-medium">
                                                        {tag}
                                                        <button type="button" onClick={() => setFormTags(t => t.filter(x => x !== tag))} className="text-neutral-500 hover:text-red-400 transition"><X className="size-3" /></button>
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4 rounded-2xl border border-neutral-800 bg-neutral-950/40 space-y-3">
                                        <Label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">Key Features / Highlights</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                value={newFeature}
                                                onChange={e => setNewFeature(e.target.value)}
                                                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }}
                                                placeholder="e.g. Real-time Payment Gateway"
                                                className="bg-neutral-950 border-neutral-800 text-xs rounded-xl"
                                            />
                                            <Button type="button" onClick={addFeature} size="sm" variant="secondary" className="rounded-xl">
                                                Add
                                            </Button>
                                        </div>
                                        {formFeatures.length > 0 && (
                                            <div className="space-y-1.5 pt-1 max-h-36 overflow-y-auto">
                                                {formFeatures.map((f, i) => (
                                                    <div key={i} className="flex items-center justify-between text-xs px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300">
                                                        <span className="truncate pr-3">• {f}</span>
                                                        <button type="button" onClick={() => setFormFeatures(arr => arr.filter(x => x !== f))} className="text-neutral-500 hover:text-red-400 transition shrink-0"><Trash2 className="size-3.5" /></button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Modal Actions */}
                                <div className="flex justify-end items-center gap-3 pt-4 border-t border-neutral-800">
                                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-xl">
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2">
                                        <Save className="size-4" />
                                        {editingIndex !== null ? 'Save Changes' : 'Add Project'}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ── Delete Confirmation Dialog Modal ─────────────────────────────────── */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md bg-neutral-900 border-neutral-800 text-white">
                    <DialogHeader>
                        <div className="size-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center mb-2">
                            <Trash2 className="size-6" />
                        </div>
                        <DialogTitle className="text-xl font-bold text-white">
                            Delete Project
                        </DialogTitle>
                        <DialogDescription className="text-neutral-400 text-sm mt-1.5">
                            Are you sure you want to delete{' '}
                            <span className="font-semibold text-neutral-200">
                                {`"${deletingIndex !== null && projects[deletingIndex] ? projects[deletingIndex].title : ''}"`}
                            </span>
                            ? This action will permanently remove it from MongoDB Atlas.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="mt-6 flex flex-row justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            disabled={isDeleting}
                            className="border-neutral-700 bg-neutral-800 hover:bg-neutral-750 text-neutral-300 rounded-xl"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-500 text-white rounded-xl shadow-lg shadow-red-600/20 flex items-center gap-2"
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" /> Deleting...
                                </>
                            ) : (
                                'Confirm Delete'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </main>
    );
}
