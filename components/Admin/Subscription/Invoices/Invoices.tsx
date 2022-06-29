import { Table, Button, Link, Text, useTheme } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { format } from "date-fns";

export const Invoices = ({ user }: any) => {
  const [invoices, setInvoices] = useState<any>();
  const { isDark } = useTheme();
  console.log(user.invoices);

  useEffect(() => {
    const userInvoices = user.invoices;
    const invoiceList = userInvoices.map((invoice: any, index: any) => {
      return {
        key: index,
        invoice: invoice.url,
        status: invoice.status,
        date: format(new Date(invoice.date * 1000), "MM/dd/yyyy"),
        amountDue: invoice.amountDue,
        amountPaid: invoice.amountPaid,
      };
    });
    setInvoices(invoiceList);
  }, []);

  const renderCell = (item: any, columnKey: any) => {
    const cellValue = item[columnKey];
    console.log(cellValue);
    switch (columnKey) {
      case "invoice":
        console.log(cellValue);
        return (
          <a
            style={{ color: "#fff" }}
            href={cellValue}
            target="_blank"
            rel="noreferrer"
          >
            <Button
              css={{ minWidth: 81 }}
              iconRight={<BiLinkExternal />}
              auto
              size="sm"
              flat
              name="invoice"
            >
              View
            </Button>
          </a>
        );
        break;
      default:
        return (
          <Text size={14} weight="medium">
            {cellValue}
          </Text>
        );
    }
  };

  if (!invoices) return <div></div>;

  return (
    <Table
      aria-label="invoices"
      css={{ width: "100%", height: "auto" }}
      // fixed
      bordered={isDark ? true : false}
    >
      <Table.Header>
        <Table.Column key="invoice">INVOICE</Table.Column>
        <Table.Column key="status">STATUS</Table.Column>
        <Table.Column key="date">DATE</Table.Column>
        <Table.Column key="amountDue">AMOUNT DUE</Table.Column>
        <Table.Column key="amountPaid">AMOUNT PAID</Table.Column>
      </Table.Header>
      <Table.Body items={invoices}>
        {(item: any) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};
