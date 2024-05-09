import {
    Box,
    Card,
    Layout,
    Link,
    List,
    Page,
    Text,
    BlockStack,
  } from "@shopify/polaris";
import Dashboard from "~/components/Dashboard";
  
  export default function DashboardPage() {
    return (
      <>
      <Dashboard/>
      </>
    );
  }
  
  function Code({ children }: { children: React.ReactNode }) {
    return (
      <Box
        as="span"
        padding="025"
        paddingInlineStart="100"
        paddingInlineEnd="100"
        background="bg-surface-active"
        borderWidth="025"
        borderColor="border"
        borderRadius="100"
      >
        <code>{children}</code>
      </Box>
    );
  }
  