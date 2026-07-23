export const staggerContainer = (delay = 0) => ({
    hidden: {},
    visible: {
        transition: {
            delayChildren: delay,
            staggerChildren: 0.18, // lower = faster snap
        },
    },
});

export const fadeUp = {
    hidden: {
        opacity: 0,
        transform: "translateY(14px) scale(0.97)",
    },
    visible: {
        opacity: 1,
        transform: "translateY(0px) scale(1)",
        transition: {
            duration: 0.45,
            easing: "cubic-bezier(0.25, 0.8, 0.35, 1)",
        },
    },
};
