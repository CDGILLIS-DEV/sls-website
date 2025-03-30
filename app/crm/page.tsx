import LeadForm from "./components/LeadForm";

export default function CRMPage() {
    return (
        <div className="min-h-screen bg-[#F9FAFB] p-8">
            <div className="max-w-5x1 mx-auto space-y-6">
            <h1 className="text 3x1 font-semibold text-gray-800">Simpatico Logistiscs Services CRM</h1>
            <p className="text-gray-500 text-sm">Track manufacturers you generate and manage shipment opportunities.</p>

            <div className="bg-whit shadow-x1 rounded-2x1 p-6 transition hover:shadow-2x1">
               <LeadForm /> 
            </div>
            </div>
        </div>
    );
}