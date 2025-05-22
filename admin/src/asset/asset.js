import General_physician from '../asset/General_physician.png';
import Dermatologist from '../asset/Dermatologist.png';
import Gynecologist from '../asset/Gynecologist.png';
import Neurologist from '../asset/Neurologist.png'; // Fixed typo
import Pediatricians from '../asset/Pediatricians.png';
import Gastroenterologist from '../asset/Gastroenterologist.png';
import Msrak from '../asset/Msrak.png';
import Dawit from '../asset/Dawit.png';
import Solomon from '../asset/Solomon.png';
import Meron from '../asset/Meron.png';
import Tsegaye from '../asset/Tsegaye.png';
import Selam from '../asset/Selam.png';
import Melkamu from '../asset/Melkamu.png';
export const specialtyData = [
  {
    specialty: 'General_physician',
    image: General_physician
  },
  {
    specialty: 'Gynecologist',
    image: Gynecologist
  },
  {
    specialty: 'Dermatologist',
    image: Dermatologist
  },
  {
    specialty: 'Neurologist',
    image: Neurologist
  },
  {
    specialty: 'Pediatrician',
    image: Pediatricians
  },
  {
    specialty: 'Gastroenterologist',
    image: Gastroenterologist
  }
];

export const Topdoctors = [
  {
    _id: 1,
    specialty: 'Gastroenterologist',
    image: Dawit,
    name: "Dr. Dawit",
    experience: "4",
    fee:50,
    degree: "MD",
    adress:{
line1:"megenegna",
line2:"bolea"
    },
    
    about: "Welcome to the practice of Dr. Dawit, a board-certified gastroenterologist dedicated to the health and well-being of patients with digestive and liver concerns. With a focus on compassionate, patient-centered care, he provides comprehensive evaluation, diagnosis, and treatment for a wide range of gastrointestinal (GI) conditions."
  },
  {
    _id: 2,
    specialty: 'Neurologist',
    image: Solomon,
    name: "Dr. Solomon",
    experience: "3",
    fee:60,

    degree: "MD",
    adress:{
      line1:"garmment",
      line2:"22"
          },
    about: "Welcome to the practice of Dr. Solomon, a board-certified neurologist committed to providing expert care for patients with neurological conditions. With a focus on patient-centered treatment, he specializes in diagnosing and managing a wide range of disorders affecting the brain, spinal cord, nerves, and muscles."
  },
  {
    _id: 3,
    specialty: 'General_physician',
    image: Melkamu,
    name: 'Dr. Melkamu',
    experience: "6",
    fee:70,
    adress:{
      line1:"meskelegna",
      line2:"lafto"
          },
    degree: "MD",
    about: "Welcome to the practice of Dr. Melkamu, a dedicated general physician committed to delivering comprehensive primary care to patients of all ages. He specializes in preventive care, diagnosis, and treatment of a broad range of medical conditions, with a patient-centered approach that focuses on building lasting relationships and promoting overall health and wellness."
  },
  {
    _id: 4,
    specialty: 'Dermatologist',
    image: Selam,
    name: 'Dr. Selam',
    experience: "6",
    fee:60,
    adress:{
      line1:"sarice",
      line2:"jemo1"
          },
    degree: "MD",
    about: "Welcome to the practice of Dr. Selam, a board-certified dermatologist with extensive experience in diagnosing and treating skin, hair, and nail conditions. She is dedicated to helping patients achieve healthy, beautiful skin through personalized, compassionate care."
  },
  {
    _id: 5,
    specialty: 'Gynecologist',
    image: Tsegaye,
    name: 'Dr. Tsegaye',
    experience: "5",
    fee:50,
    adress:{
      line1:"Jermmen",
      line2:"Ayer tena"
          },
    degree: "MD",
    about: "Welcome to the practice of Dr. Tsegaye, a board-certified gynecologist devoted to providing compassionate, comprehensive healthcare for women. With expertise in women’s health at all stages of life, she specializes in both preventative care and the treatment of complex gynecological issues."
  },
  {
    _id: 6,
    specialty: 'Neurologist',
    image: Meron,
    name: 'Dr. Meron',
    experience: "5",
    fee:50,
    adress:{
      line1:"BIASS",
      line2:"Krkoss"
          },
    degree: "MD",
    about: "Welcome to the practice of Dr. Meron, a board-certified neurologist committed to providing expert care for patients with neurological conditions. He specializes in diagnosing and treating a wide range of disorders that affect the brain, spinal cord, nerves, and muscles."
  },
  {
    _id: 7,
    specialty: 'Pediatricians',
    image: Msrak,
    
    name: 'Dr. Msrak',
    experience: "2",
    fee:100,
    adress:{
      line1:"Hanamariam",
      line2:"bolea"
          },
    degree: "MD",
    about: "Welcome to the practice of Dr. Msrak, a board-certified pediatrician dedicated to providing compassionate, high-quality care to children from infancy through adolescence. She understands that each child is unique, and works closely with families to ensure a safe, healthy, and supportive environment for their child’s growth and development."
  }
];
