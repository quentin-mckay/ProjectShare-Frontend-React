import { motion } from 'framer-motion'

const animations = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
}

const transition = {
    duration: 0.1, 
    ease: 'easeOut'
}

const AnimatedPage = ({children}) => {
    return (
        <motion.div variants={animations} initial='initial' animate='animate' exit='exit' transition={transition}>
        {/* // <motion.div variants={animations} initial='initial' animate='animate' transition={{duration: 0.2, ease: 'easeOut'}}> */}
            {children}
        </motion.div>
    )
}

export default AnimatedPage
