import ContactForm from 'components/common/ContactForm';
import ContactsList from 'components/common/Contacts/ContactsList';
import Section from 'components/common/Section';

function Contacts() {
  return (
    <>
      <Section title="Phonebook">
        <ContactForm />
      </Section>

      <Section title="ContactsList">
        <ContactsList />
      </Section>
    </>
  );
}

export default Contacts;
