const SkeletonText = ({ className }: { className?: string }) => (
  <h2
    style={{
      backgroundColor: "rgba(227, 227, 227, 1)",
    }}
    className={
      `text-sm font-medium text-gray-800 dark:text-black product_title_table rounded-lg ` +
      (className ? className : "w-[100px] h-[40px]")  
    }
  ></h2>
);
export default SkeletonText;
