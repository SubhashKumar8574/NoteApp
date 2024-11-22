import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NoteModal from '../components/NoteModal';
import axios from 'axios'
import NoteCard from '../components/NoteCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/ContextProvider';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (!user && notes.length > 0) {
      setNotes([]);
    }
    setFilteredNotes(notes.filter((note) => note.title.toLowerCase().includes(query.toLowerCase())))
  }, [query, notes, user])

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("https://noteapp-2ys7.onrender.com/api/note", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const notesWithIds = data.notes.map(note => ({
        ...note,
        id: note.id || uuidv4(), // Use existing ID or generate one
      }));

      setNotes(notesWithIds);
      // setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const onEdit = (note) => {
    setCurrentNote(note);
    setModalOpen(true);
  }

  const addNote = async (title, description) => {
    try {
      const response = await axios.post('https://noteapp-2ys7.onrender.com/api/note/add',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      if (response.data.success) {
        fetchNotes();
        toast.success("Note Added Successfully", {
          autoClose: 1500,
        });
        closeModal();
      }
    } catch (error) {
      console.log(error);

    }
  }

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(`https://noteapp-2ys7.onrender.com/api/note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      if (response.data.success) {
        fetchNotes();
        toast.success("Note Edited Successfully", {
          autoClose: 1500,
        });
        closeModal();
      }

    } catch (error) {
      console.log(error);

    }
  }

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`https://noteapp-2ys7.onrender.com/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      if (response.data.success) {
        fetchNotes();
        toast.info("Note Deleted Successfully", {
          autoClose: 1500,
        });
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='bg-zinc-600/40 min-h-screen'>
      <Navbar setQuery={setQuery} />

      <div className='px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6 ' >
        {filteredNotes.length > 0 ? filteredNotes.map(note => (<NoteCard key={note.id} note={note} onEdit={onEdit} deleteNote={deleteNote} />)) :
          <div className='p-28 rounded-2xl bg-green-600 text-blue-800 text-center text-3xl col-span-1 md:col-start-2 ' ><h3>No Notes Present</h3></div>}
      </div>

      <button onClick={() => setModalOpen(true)} className='pointer-cursor fixed right-10 bottom-10 text-4xl bg-green-600 text-white font-bold p-6 rounded-full hover:opacity-90 hover:text-black'>+</button>
      {isModalOpen && <NoteModal user={user} closeModal={closeModal} addNote={addNote} currentNote={currentNote} editNote={editNote} setCurrentNote={setCurrentNote} />}
    </div>
  )
}

export default Home