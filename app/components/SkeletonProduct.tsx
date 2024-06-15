import { SkeletonThumbnail } from "@shopify/polaris";
import SkeletonText from "./SkeletonText";

const SkeletonProduct = () => (
    <tr
      style={{
        background: "#FFFFFF",
        borderTop: "1px solid #bebcbf",
      }}
    >
      <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
        <div className="inline-flex items-center gap-x-3">
          <div className="flex items-center gap-x-2">
            <SkeletonThumbnail size="small" />
            <SkeletonText className="w-[150px] h-[40px]"/>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-[#0c5132] ">
        <SkeletonText />
      </td>
      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
        <SkeletonText />
      </td>
      <td
        className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
        style={{ position: "relative", zIndex: "0" }}
      >
        <SkeletonText className="w-[300px] h-[40px]"/>
      </td>
      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        <SkeletonText />
      </td>
    </tr>
  );

  export default SkeletonProduct;