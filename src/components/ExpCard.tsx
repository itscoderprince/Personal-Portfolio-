import type { ExperienceType } from "@/type/index"


const ExpCard = ({ item }: { item: ExperienceType }) => {
  return (
    <div className="relative group">
      <div className="absolute -left-7.5 top-2 size-3 bg-muted-foreground group-hover:bg-[#0987f2] rounded-full transition duration-300"></div>
      <h2
        className="mb-2 w-fit rounded-md px-2 py-0.5 font-bold text-neutral-900 shadow-[var(--shadow-aceternity)] dark:text-neutral-100 group-hover:text-[#0987f2] transition duration-300"
        style={{ filter: "blur(0px)", opacity: 1 }}
      >
        {item.year}
      </h2>
      <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
      <p className="text-sm text-neutral-400 mb-1">
        Course by {" "}
        <span className="font-medium text-foreground">{item.institute}</span>
      </p>
      <p className="text-sm text-neutral-400">{item.desc}</p>
    </div>
  )
}

export default ExpCard