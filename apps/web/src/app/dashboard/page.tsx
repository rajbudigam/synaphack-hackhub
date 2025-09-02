import { ShellLayout } from "@/components/shell/shell-layout";
import { BackButton } from "@/components/ui/back-button";

export default function Dashboard() {
  return (
    <ShellLayout>
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 min-h-full">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <BackButton />
              <div className="text-center space-y-4 flex-1">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  HackHub Dashboard
                </h1>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  Manage your hackathons, teams, and submissions with powerful tools and insights.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-2">Events</h3>
                <p className="text-slate-600 dark:text-slate-300">Manage hackathon events</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-2">Teams</h3>
                <p className="text-slate-600 dark:text-slate-300">View and manage teams</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-2">Submissions</h3>
                <p className="text-slate-600 dark:text-slate-300">Review submissions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShellLayout>
  );
}
