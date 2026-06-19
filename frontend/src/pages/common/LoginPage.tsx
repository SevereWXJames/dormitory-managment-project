import { CommonFrame } from "../../components/common/CommonFrame";
import { LoginForm } from "../../components/common/LoginForm";

export function LoginPage() {
	return (
		<>
			<CommonFrame commonFrameType="LOGIN"></CommonFrame>
			<main>
				<LoginForm />
			</main>
		</>
	)
}