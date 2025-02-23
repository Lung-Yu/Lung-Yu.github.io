export interface Certificate {
  title: string;
  institution: string;
  category: string;
  image: string;
  description: string;
  fullName: string;
  abbreviation: string;
  obtainedAt: string;
  expiryDate?: string; // Optional field for expiry date
}

const certificateData: Certificate[] = [
  {
    title: 'Ethical Hacking',
    category: 'Cyber Security',
    institution: 'EC-Council',
    image: '/src/assets/images/certifications/ec-council/ECC_Certified Ethical Hacker.jpg',
    description: 'Certified Ethical Hacker (CEH) is a qualification obtained by demonstrating knowledge of assessing the security of computer systems by looking for weaknesses and vulnerabilities in target systems, using the same knowledge and tools as a malicious hacker, but in a lawful and legitimate manner to assess the security posture of a target system.',
    fullName: 'Certified Ethical Hacker',
    abbreviation: 'CEH',
    obtainedAt: '2021-05-15',
    expiryDate: '2024-05-15',
  },
  {
    title: 'ISO 27001:2022 Lead Auditor',
    category: 'Cyber Security',
    institution: 'BSI',
    image: '/src/assets/images/certifications/ISO/ISO_27001_2022_LA.png',
    description: 'The ISO 27001 Lead Auditor training course will equip participants with the skills and ability to perform audits by applying widely recognized audit principles, procedures and techniques. During this training course, participants will acquire the knowledge and skills to plan and carry out internal and external audits in compliance with ISO 19011 and ISO/IEC 17021-1 certification process.',
    fullName: 'ISO 27001:2022 Lead Auditor',
    abbreviation: 'ISO 27001 LA',
    obtainedAt: '2022-03-10',
    expiryDate: '2025-03-10',
  },
  {
    title: 'CSSLP',
    category: 'Cyber Security',
    institution: 'ISC2',
    image: '/src/assets/images/certifications/isc2/isc_csslp.png',
    description: 'The Certified Secure Software Lifecycle Professional (CSSLP) is a certification designed to ensure that security is considered throughout the entire software development lifecycle. CSSLPs are trained in application security, security design principles, and compliance issues.',
    fullName: 'Certified Secure Software Lifecycle Professional',
    abbreviation: 'CSSLP',
    obtainedAt: '2020-11-20',
    expiryDate: '2023-11-20',
  },
  {
    title: 'CISSP',
    category: 'Cyber Security',
    institution: 'ISC2',
    image: '/src/assets/images/certifications/isc2/isc_cissp.png',
    description: 'The Certified Information Systems Security Professional (CISSP) is a certification for information technology security professionals. It was created by the International Information Systems Security Certification Consortium (ISC)², an international non-profit specializing in managing security certifications.',
    fullName: 'Certified Information Systems Security Professional',
    abbreviation: 'CISSP',
    obtainedAt: '2019-08-05',
    expiryDate: '2022-08-05',
  }
];

export default certificateData;