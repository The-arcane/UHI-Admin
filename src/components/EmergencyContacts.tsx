import React, { useState } from 'react';
import { Phone, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

interface Contact {
  id: number;
  name: string;
  relationship: string;
  phone: string;
}

function EmergencyContacts() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: 'John Doe',
      relationship: 'Father',
      phone: '+91 98765 43210',
    },
    {
      id: 2,
      name: 'Jane Smith',
      relationship: 'Spouse',
      phone: '+91 98765 43211',
    },
  ]);

  const [newContact, setNewContact] = useState<Omit<Contact, 'id'>>({
    name: '',
    relationship: '',
    phone: '',
  });

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, relationship, phone } = newContact;

    if (!name.trim() || !relationship.trim() || !phone.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    const newEntry: Contact = {
      id: Date.now(),
      name: name.trim(),
      relationship: relationship.trim(),
      phone: phone.trim(),
    };

    setContacts((prev) => [...prev, newEntry]);
    setNewContact({ name: '', relationship: '', phone: '' });
    toast.success('Emergency contact added successfully');
  };

  const handleDeleteContact = (id: number) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
    toast.success('Contact removed successfully');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Emergency Contacts</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add New Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold mb-4">Add New Contact</h3>
          <form onSubmit={handleAddContact} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Name</label>
              <input
                type="text"
                value={newContact.name}
                onChange={(e) =>
                  setNewContact({ ...newContact, name: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Contact name"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Relationship</label>
              <input
                type="text"
                value={newContact.relationship}
                onChange={(e) =>
                  setNewContact({ ...newContact, relationship: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g., Parent, Friend"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                value={newContact.phone}
                onChange={(e) =>
                  setNewContact({ ...newContact, phone: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="+91 98765 43210"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </button>
          </form>
        </motion.div>

        {/* Display Contacts */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-4">Your Emergency Contacts</h3>
          <div className="space-y-4">
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-semibold">{contact.name}</h4>
                    <p className="text-sm text-gray-600">{contact.relationship}</p>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                      <Phone className="w-4 h-4 mr-2" />
                      {contact.phone}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="text-gray-500 text-center py-8">
                No emergency contacts added yet.
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Emergency Numbers Section */}
      <div className="mt-12 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Important Emergency Numbers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <Phone className="text-red-500" />
            <div>
              <p className="font-semibold">Ambulance</p>
              <p className="text-xl">102</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="text-blue-500" />
            <div>
              <p className="font-semibold">Police</p>
              <p className="text-xl">100</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="text-orange-500" />
            <div>
              <p className="font-semibold">Fire</p>
              <p className="text-xl">101</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmergencyContacts;
