import { reactive } from "vue";

export type Contact = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

interface ContactStore {
  contacts: Contact[];
  filteredContacts: Contact[];
  isAddingContact: boolean;
  currentContactId: number;

  addContact(contact: Omit<Contact, "id">): void;
  updateContact(contact: Contact): void;
  deleteContact(id: number): void;
  searchContacts(search: string): void;
  sortContacts(): void;
  clearCurrentContact(): void;
}

export const contactListStore = reactive<ContactStore>({
  contacts: [] as Contact[],
  filteredContacts: [] as Contact[],
  isAddingContact: false,
  currentContactId: -1 as number,

  addContact(contact) {
    const newContact = {
      ...contact,
      id: Date.now(),
    };

    this.contacts = [...this.contacts, newContact];
    this.sortContacts();
    this.filteredContacts = this.contacts;
    this.clearCurrentContact();
  },

  updateContact(contact) {
    const index = this.contacts.findIndex((c) => c.id === this.currentContactId);
    if (index === -1) return;

    const newContacts = [...this.contacts];
    newContacts[index] = contact;
    this.contacts = newContacts;
    this.sortContacts();
    this.filteredContacts = this.contacts;
    this.currentContactId = -1;
  },

  deleteContact(id) {
    this.contacts = this.contacts.filter((c) => c.id !== id);
    this.sortContacts();
    this.filteredContacts = this.contacts;
  },

  sortContacts() {
    this.contacts = this.contacts.sort((a, b) => a.name.localeCompare(b.name));
  },

  searchContacts(search: string) {
    this.filteredContacts = this.contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()),
    );
  },

  clearCurrentContact() {
    this.currentContactId = -1;
    this.isAddingContact = false;
  },
});
