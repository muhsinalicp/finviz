import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 md:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center">About FinViz</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What is FinViz?</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm leading-relaxed">
          FinViz (short for <strong>Finance Visualizer</strong>) is a simple and
          elegant tool to help you take control of your personal finances. Track
          your transactions, analyze your spending habits, and stay on top of
          your monthly budgets — all in one place.
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Why FinViz?</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm leading-relaxed">
          Many budgeting apps are bloated or overly complex. FinViz was designed
          to be fast, focused, and user-friendly. No logins, no distractions —
          just your finances visualized simply and effectively.
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm leading-relaxed space-y-2">
          <ul className="list-disc list-inside">
            <li>Add, edit, and delete transactions with ease</li>
            <li>Track expenses over time using interactive charts</li>
            <li>Visualize your spending by category</li>
            <li>Set monthly budgets and compare against actual spending</li>
            <li>Get real-time insights on your financial behavior</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
