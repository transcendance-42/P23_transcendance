import { motion } from 'framer-motion'

const Badge = ({ type, opacity }) => (
    <motion.div style={{ opacity }}
        className={`absolute z-20 font-bold text-2xl border-4 px-3 py-1 rounded-lg font-heading
            ${type === 'like'
                ? 'top-4 left-4 text-action-match border-action-match rotate-[-20deg]'
                : 'top-4 right-4 text-action-pass border-action-pass rotate-[20deg]'}`}>
        {type === 'like' ? 'LIKE' : 'PASS'}
    </motion.div>
)

export default Badge