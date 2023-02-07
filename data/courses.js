const courses = [
  {
    category: 'Google IT Support Professional Certificate',
    image: '/public/images/PHOTOS-NO_BACKGROUND/Support.svg',
    title: 'Technical Support Fundamentals',
    description:'This course is the first of a series that aims to prepare you for a role as an entry-level IT Support Specialist. In this course, you’ll be introduced to the world of Information Technology, or IT. You’ll learn about the different facets of Information Technology, like computer hardware, the Internet, computer software, troubleshooting, and customer service. This course covers a wide variety of topics in IT that are designed to give you an overview of what’s to come in this certificate program.',
    subdescription:'By the end of this course, you’ll be able to:',
    list:['understand how the binary system works','assemble a computer from scratch, choose and install an operating system on a computer','understand what the Internet is, how it works','and the impact it has in the modern world','learn how applications are created and how they work under the hood of a computer','utilize common problem-solving methodologies and soft skills in an Information Technology setting'],
    skills:['Binary Code','Customer Support','Linux','Troubleshooting']
  },
  {
    category: 'Google IT Support Professional Certificate',
    image: '/public/images/PHOTOS-NO_BACKGROUND/Blue_coding.svg',
    title: 'The Bits and Bytes of Computer Networking',
    description:'This course is designed to provide a full overview of computer networking. We’ll cover everything from the fundamentals of modern networking technologies and protocols to an overview of the cloud to practical applications and network troubleshooting. ',
    subdescription:'By the end of this course, you’ll be able to:',
    list:['describe computer networks in terms of a five-layer model','understand all of the standard protocols involved with TCP/IP communications','grasp powerful network troubleshooting tools and techniques','learn network services like DNS and DHCP that help make computer networks run','understand cloud computing, everything as a service','and cloud storage'],
    skills:['Domain Name System (DNS)','Ipv4','Network Model','Troubleshooting']
  },
  {
    category: 'Google IT Support Professional Certificate',
    image: '/public/images/PHOTOS-NO_BACKGROUND/settings.svg',
    title: 'Operating Systems and You: Becoming a Power User',
    description:'In this course -- through a combination of video lectures, demonstrations, and hands-on practice -- you’ll learn about the main components of an operating system and how to perform critical tasks like managing software and users, and configuring hardware.',
    subdescription:'By the end of this course you’ll be able to:',
    list:['navigate the Windows and Linux filesystems using a graphical user interface and command line interpreter','set up users','groups','and permissions for account access','install, configure, and remove software on the Windows and Linux operating systems','configure disk partitions and filesystems','understand how system processes work and how to manage them','work with system logs and remote connection tools','utilize operating system knowledge to troubleshoot common issues in an IT Support Specialist role'],
    skills:['Powershell','Linux File Systems','Linux','Command-Line Interface']
  },
  {
    category: 'Google IT Support Professional Certificate',
    image: '/public/images/PHOTOS-NO_BACKGROUND/DATA_2.svg',
    title: 'System Administration and IT Infrastructure Services',
    description:"This course will transition you from working on a single computer to an entire fleet. Systems administration is the field of IT that’s responsible for maintaining reliable computers systems in a multi-user environment. In this course, you’ll learn about the infrastructure services that keep all organizations, big and small, up and running. We’ll deep dive on cloud so that you’ll understand everything from typical cloud infrastructure setups to how to manage cloud resources. You'll also learn how to manage and configure servers and how to use industry tools to manage computers, user information, and user productivity. Finally, you’ll learn how to recover your organization’s IT infrastructure in the event of a disaster.",
    subdescription:'By the end of this course you’ll be able to:',
    list:["utilize best practices for choosing hardware, vendors, and services for your organization","understand how the most common infrastructure services that keep an organization","running work, and how to manage infrastructure servers","understand how to make the most of the cloud for your organization","manage an organization’s computers and users using the directory services, Active Directory, and OpenLDAP"," choose and manage the tools that your organization will use","backup your organization’s data and know how to recover your IT infrastructure in the case of a disaster","utilize systems administration knowledge to plan and improve processes for IT environments"],
    skills:['Directory Service','Lightweight Directory Access Protocol (LDAP)','Backup']
  },
  {
    category: 'Google IT Support Professional Certificate',
    image: '/public/images/PHOTOS-NO_BACKGROUND/Cyber_2.svg',
    title: 'IT Security: Defense against the digital dark arts',
    description:'This course covers a wide variety of IT security concepts, tools, and best practices. It introduces threats and attacks and the many ways they can show up. We’ll give you some background of encryption algorithms and how they’re used to safeguard data. Then, we’ll dive into the three As of information security: authentication, authorization, and accounting. We’ll also cover network security solutions, ranging from firewalls to Wifi encryption options. The course is rounded out by putting all these elements together into a multi-layered, in-depth security architecture, followed by recommendations on how to integrate a culture of security into your organization or team.',
    subdescription:'At the end of this course, you’ll understand:',
    list:["how various encryption algorithms and techniques work as well as their benefits and limitations.","various authentication systems and types.","the difference between authentication and authorization.","how to evaluate potential risks and recommend ways to reduce risk.","best practices for securing a network.","how to help others to grasp security concepts and protect themselves."],
    skills:['Cybersecurity','Wireless Security','Cryptography','Network Security']
  },
  {
    category: 'Web Development',
    image: '/public/images/PHOTOS-NO_BACKGROUND/Web_dev.svg',
    title: 'Web Development',
    description:'Join our Web Development bootcamp and get the hands-on skills you need to land a job in the growing tech industry. Build apps with HTML, CSS, JavaScript, and React. 9 week full time or 24 week part time courses to become a Full-Stack Developer. No previous IT background is required. Learn in person or online.',
    title_why:'Why Web Development at Ironhack?'
  },
  {
    category: 'UX/UI Design',
    image: '/public/images/PHOTOS-NO_BACKGROUND/UX.svg',
    title: 'UX/UI Design',
    description:"Join our UX UI Design immersive bootcamp and get the hands-on skills you need to land a job in the growing tech industry. Learn user experience, research, Figma, design thinking, and user interface to be part of any company's workforce. Become a UX UI Designer in just 9 weeks full time or 24 weeks part time without any previous IT background.",
    title_why:'Why should you learn UX/UI Design?'
  },
  {
    category: 'Data Analytics',
    image: '/public/images/PHOTOS-NO_BACKGROUND/DATA.svg',
    title: 'Data Analytics',
    description:"Join our Data Analytics immersive bootcamp and get the hands-on skills you need to land a job in the growing tech industry. Intensive training in Python, SQL, Tableau, and statistics to become a Data Analyst. Study 9 weeks full-time, or 24 weeks part-time. No previous experience required.",
    title_why:'Why should you learn Data analytics?'
  },
  {
    category: 'Cybersecurity',
    image: '/public/images/PHOTOS-NO_BACKGROUND/Cyber.svg',
    title: 'Cybersecurity',
    description:"Join our Cybersecurity bootcamp powered by Cybint and get the hands-on skills you need to land a job in the growing cybersecurity industry. Develop the knowledge you require to be part of any company's cybersecurity workforce. Become a cybersecurity professional in just 12 weeks or 26 weeks without any previous IT background.",
    title_why:'Why should you learn cybersecurity?'
  }
]


module.exports = courses;