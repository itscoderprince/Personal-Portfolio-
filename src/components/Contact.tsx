'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { fadeUp } from '@/lib/animation';
import SectionHeader from './SectionHeader';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import PrimaryButton from './ui/primary-button';
import { sendEmail } from '@/app/actions/contact';
import { CustomToast } from './ui/CustomToast';

// Icons
import { User, Building2, Mail, Phone, MessageSquare, MailIcon, Loader2 } from "lucide-react";

type ContactFormValues = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);

    // Create FormData out of standard values
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.append(key, value));

    const result = await sendEmail(null, formData);

    setToast({
      message: result.message,
      type: result.success ? 'success' : 'error'
    });

    if (result.success) {
      form.reset();
    }

    setIsSubmitting(false);
  };

  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ once: false, amount: 0.2 }}
      variants={fadeUp}
      className='mt-30 scroll-mt-10 relative'
      id='contact'
    >
      <SectionHeader
        subtitle='Contact'
        title={`Let's make something awesome together !`}
      />

      {toast && (
        <CustomToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full mx-auto space-y-5 mt-10 rounded-md'
        >
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>

            {/* Name */}
            <FormField
              control={form.control}
              name='name'
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-neutral-400" />
                      <Input disabled={isSubmitting} className='pl-10 border border-neutral-200 dark:border-neutral-700 h-12 rounded-md bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500' placeholder='Your name' {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Company */}
            <FormField
              control={form.control}
              name='company'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-neutral-400" />
                      <Input disabled={isSubmitting} className='pl-10 border border-neutral-200 dark:border-neutral-700 h-12 rounded-md bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500' placeholder='Company name' {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name='email'
              rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } }}
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-neutral-400" />
                      <Input disabled={isSubmitting} type='email' className='pl-10 border border-neutral-200 dark:border-neutral-700 h-12 rounded-md bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500' placeholder='your@example.com' {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-neutral-400" />
                      <Input disabled={isSubmitting} type='tel' className='pl-10 border border-neutral-200 dark:border-neutral-700 h-12 rounded-md bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500' placeholder='+123456789' {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Message */}
          <FormField
            control={form.control}
            name='message'
            rules={{ required: 'Message is required' }}
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Message *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 size-5 text-neutral-400" />
                    <Textarea disabled={isSubmitting} className='pl-10 border border-neutral-200 dark:border-neutral-700 min-h-[120px] rounded-md bg-neutral-100 dark:bg-neutral-900 py-3 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500' placeholder='Your message...' {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <div className='flex justify-end'>
            <PrimaryButton disabled={isSubmitting} type='submit' className='mt-2 flex items-center gap-2 h-11 px-6 text-base w-full sm:w-auto justify-center'>
              {isSubmitting ? (
                <>Sending... <Loader2 className="animate-spin" size={18} /></>
              ) : (
                <>Send <MailIcon size={18} /></>
              )}
            </PrimaryButton>
          </div>

        </form>
      </Form>
    </motion.section>
  );
};

export default Contact;
