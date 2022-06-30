import { Table, Button, Link, Text, useTheme } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { format } from "date-fns";
import { Badge } from "../../Badge";

export const Invoices = ({ user }: any) => {
  const [invoices, setInvoices] = useState<any>();
  const { isDark } = useTheme();

  useEffect(() => {
    const userInvoices = user.subscription.cancelAtPeriodEnd
      ? user.invoices.slice(0, user.invoices.length - 1)
      : user.invoices;
    const formatDollars = (str: string): string => {
      if (str === "0") return "$0.00";
      const first = str.slice(0, str.length - 2);
      const last = str.slice(str.length - 2);
      return `$${first}.${last}`;
    };
    const invoiceList = userInvoices.map((invoice: any, index: any) => {
      return {
        key: index,
        invoice: invoice.url,
        status: invoice.status,
        date: format(new Date(invoice.date * 1000), "MMM dd, yyyy"),
        amountDue: formatDollars(invoice.amountDue),
        amountPaid: formatDollars(invoice.amountPaid),
      };
    });
    setInvoices(invoiceList.reverse());
  }, [user.invoices]);

  const getType = (status: string): string => {
    if (status === "paid") return "success";
    if (status === "draft") return "warning";
    return "error";
  };

  const renderCell = (item: any, columnKey: any) => {
    const cellValue = item[columnKey];
    console.log(cellValue);
    switch (columnKey) {
      case "invoice":
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
              disabled={cellValue === null ? true : false}
            >
              View
            </Button>
          </a>
        );
        break;
      case "status":
        return <Badge type={getType(cellValue)} text={cellValue} />;
      default:
        return (
          <Text size={14} weight={isDark ? "medium" : "semibold"}>
            {cellValue}
          </Text>
        );
    }
  };

  if (!invoices) return <div></div>;

  if (invoices.length <= 5) {
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
            <Table.Row key={item.key}>
              {(columnKey) => (
                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    );
  }

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
          <Table.Row key={item.key}>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
      <Table.Pagination rowsPerPage={5} shadow noMargin align="center" />
    </Table>
  );
};
