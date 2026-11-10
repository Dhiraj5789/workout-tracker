import { AuthGate } from '@/components/AuthGate';
import { Tracker } from '@/components/Tracker';

export default function Page() {
  return (
    <AuthGate>
      <Tracker />
    </AuthGate>
  );
}
