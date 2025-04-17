
import { Clock, FileCheck, MessageSquare } from "lucide-react";

export function FeatureCards() {
  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="feature-card">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                <FileCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Avaliação Clara</h3>
              <p className="text-muted-foreground">
                Critérios objetivos para facilitar a compreensão
              </p>
            </div>
          </div>
          <div className="feature-card">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 rounded-full bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-300">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Economia de Tempo</h3>
              <p className="text-muted-foreground">
                Automatize parte do processo avaliativo
              </p>
            </div>
          </div>
          <div className="feature-card">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Feedback Eficaz</h3>
              <p className="text-muted-foreground">
                Comunique expectativas com precisão
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
