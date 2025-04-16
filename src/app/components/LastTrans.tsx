import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LastTransProps {
  lasttransations: {
    amount: number;
    date: string;
    description: string;
    category: string;
  }[];
}

function LastTrans({ lasttransations }: LastTransProps) {
  return (
    <Table>
      <TableCaption>A list of your recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className=" text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>

        </TableRow> */}
        {lasttransations.map(({ date, description, amount, category }, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{date.split("T")[0]}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>{category}</TableCell>
            <TableCell className="text-right font-bold">₹{amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default LastTrans;
