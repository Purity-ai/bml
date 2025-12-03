import profile_pic from './profile_pic.jpg'
import about_image from './about_image.png'
import logo from './logo.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import CL400 from './CL400.png'
import CL500 from './CL500.png'
import Computer_eng from './Computer_eng-1.png'
import Hardware_lab from './Hardware_lab.png'
import Software_lab from './Software_lab.png'
import Cyber from './Cyber.png'
import NDL from './NDL.png'
import group_profiles from './group_profiles.jpg'
import Apointment from './Apointment.png'





export const assets = {
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    CL400,
    CL500,
    Computer_eng,
    Hardware_lab,
    Software_lab,
    Cyber,
    NDL,  
    group_profiles,
    Apointment,
}

export const specialityData = [
    {
        speciality: 'Computer Engineering',
        image: Computer_eng
    },
    {
        speciality: 'Cyber Security',
        image: Cyber
    },
    {
        speciality: 'ICT',
        image: NDL
    },
    {
        speciality: 'Software Engineering',
        image: Software_lab
    },
    {
        speciality: 'Hardware Engineering',
        image: Hardware_lab
    },
    {
        speciality: 'Network Engineering',
        image: CL400
    },
]

export const Venues = [
    {
        name: 'ICT-lab',
        image: NDL,
        number: 1,
        speciality: 'Information Communication Technology',
        experience: '4 Years',
        about: 'ICT-lab is well equipped with modern computers and high-speed internet connectivity. The lab provides a conducive environment for learning and research in the field of Information Communication Technology.',
        location: {
            line1: 'Faculty of Computer Engineering, Main Campus',
            line2: '2nd floor room 210'
        }
    },
    {
        name: 'Cyber Security lab',
        image: Cyber,
        number: 2,
        speciality: 'Cyber Security',
        about: 'Cyber Security lab is designed to provide hands-on experience in the field of cyber security. The lab is equipped with the latest tools and technologies to help students understand the concepts of network security, ethical hacking, and digital forensics.',
        location: {
            line1: 'Faculty of Computer Engineering, Main Campus',
            line2: '1st floor room 110'
        }
    },
    {
        name: 'Network Degree Lab',
        image: CL400,
        number: 3,
        speciality: 'Network Engineering',
        about: 'Network Degree Lab is equipped with advanced networking equipment and software to provide students with practical experience in designing, implementing, and managing computer networks. The lab focuses on various aspects of network engineering, including routing, switching, and network security.',
        location: {
            line1: 'Faculty of Computer Engineering, Main Campus',
            line2: '3rd floor room 310'
        }
    },
    {
        name: 'Software Engineering Lab',
        image: Software_lab,
        number: 4,
        speciality: 'Software Engineering',
        about: 'Software Engineering Lab is dedicated to providing students with hands-on experience in software development methodologies, programming languages, and software testing techniques. The lab is equipped with modern computers and software development tools to facilitate learning and innovation.',
        location: {
            line1: 'Faculty of Computer Engineering, Main Campus',
            line2: '2nd floor room 220'
        }
    },
    {
        name: 'Hardware Engineering Lab',
        image: Hardware_lab,
        number: 5,
        speciality: 'Hardware Engineering',
        about: 'Hardware Engineering Lab is designed to provide students with practical experience in computer hardware design, assembly, and troubleshooting. The lab is equipped with various hardware components and diagnostic tools to help students understand the intricacies of computer hardware systems.',
        location: {
            line1: 'Faculty of Computer Engineering, Main Campus',
            line2: '1st floor room 120'
        }
    },
    {
        name: 'Computer Engineering Lab',
        image: Computer_eng,
        number: 6,
        speciality: 'Computer Engineering',
        about: 'Computer Engineering Lab offers students a comprehensive learning environment to explore the fundamentals of computer engineering. The lab is equipped with state-of-the-art computers and software tools to facilitate learning in areas such as computer architecture, operating systems, and embedded systems.',
        location: {
            line1: 'Faculty of Computer Engineering, Main Campus',
            line2: '3rd floor room 320'
        }
    },
]


export default assets;