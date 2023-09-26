import LogInView from 'components/common/LogInView';
import Section from 'components/common/Section';
import { useLocation } from 'react-router-dom';

function LogIn() {
  const location = useLocation();
  const navigateTo = location.state?.from?.pathname || '/';

  return (
    <Section title="LogIn">
      <LogInView navigateTo={navigateTo} />
    </Section>
  );
}

export default LogIn;
