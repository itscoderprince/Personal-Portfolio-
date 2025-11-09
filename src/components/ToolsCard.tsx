import { motion } from "motion/react"
import type { ToolsType } from "../types"


const ToolsCard = ({tool}:{tool:ToolsType}) => {
  return (
    <motion.div
    className="border border-neutral-700 rounded-md flex justify-center items-center flex-col py-4"
    >
<img src={tool.imgSrc} alt={tool.label} />
<p className="font-bold mt-2">{tool.label}</p>
    </motion.div>
  )
}

export default ToolsCard