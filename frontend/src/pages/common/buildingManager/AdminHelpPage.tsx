import { CommonFrame } from "../../../components/common/CommonFrame";

const faqs = [
    { question: "How do I review a new maintenance request?", answer: "Open the Maintenance page, check the latest request, and update its status once you confirm the issue." },
    { question: "How do I share a building-wide notice?", answer: "Go to the Notices page, create or update a notice, and choose the visibility scope before publishing." },
    { question: "What if a resident reports a facility issue?", answer: "Log the issue under Maintenance and mark it as In Progress until the facility is verified." },
];

export function AdminHelpPage() {
    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER">
                <div className="adminHelpPage">
                    <h1>Admin Help</h1>
                    <p>Common support questions for building managers.</p>

                    <section>
                        <h2>Common questions</h2>
                        {faqs.map((faq) => (
                            <div key={faq.question} style={{ border: "1px solid #ccc", borderRadius: 8, padding: "1rem", marginBottom: "1rem" }}>
                                <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{faq.question}</div>
                                <div>{faq.answer}</div>
                            </div>
                        ))}
                    </section>
                </div>
            </CommonFrame>
        </>
    );
}
