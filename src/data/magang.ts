import type { Locale } from '../types/portfolio';

// Add only owner-approved images with bilingual captions; logos and CVs are not creative evidence.
export interface CreativeWork {
    id: string;
    category: 'script' | 'event' | 'teaching';
    image: string;
    title: Record<Locale, string>;
    caption: Record<Locale, string>;
    alt: Record<Locale, string>;
    contribution?: Record<Locale, string>;
}
export const creativeWorks: CreativeWork[] = [];

export const bureauPanels = {
    id: {
        sampling: {
            title: 'Mengenal sekitar, belajar peduli', intro: 'Saya ingin mengenal lebih dekat persoalan sosial dan lingkungan di sekitar saya, lalu belajar mengambil bagian melalui hal-hal yang bisa saya lakukan bersama teman-teman.', items: [
                { title: 'Kepedulian sosial', description: 'Belajar memahami kebutuhan orang lain dan ikut membantu melalui kegiatan bersama.' },
                { title: 'Kesadaran lingkungan', description: 'Lebih peka terhadap persoalan lingkungan dan membiasakan kepedulian dalam keseharian.' },
                { title: 'Kebersamaan', description: 'Bertukar pandangan, bekerja sama, dan belajar dari orang-orang yang saya temui.' },
            ]
        },
        biner: { title: 'Mempersiapkan langkah berikutnya', items: ['Mengenal dunia pascakampus.', 'Belajar dari alumni dan praktisi.', 'Memahami kewirausahaan.'] },
    },
    en: {
        sampling: {
            title: 'Getting to know my surroundings, learning to care', intro: 'I want to better understand the social and environmental issues around me, then learn to play a part through things I can do together with friends.', items: [
                { title: 'Social awareness', description: 'Learning to understand other people’s needs and help through shared activities.' },
                { title: 'Environmental awareness', description: 'Becoming more aware of environmental issues and making care a part of everyday life.' },
                { title: 'Togetherness', description: 'Exchanging perspectives, working together, and learning from the people I meet.' },
            ]
        },
        biner: { title: 'Preparing for the next step', items: ['Getting to know life after university.', 'Learning from alumni and practitioners.', 'Understanding entrepreneurship.'] },
    },
};

export const applicationVisuals = {
    id: { about: 'Tentang Saya', creativity: 'Kreativitas', learning: 'Hal yang ingin saya pelajari', interests: ['Riset', 'Pengolahan Data', 'Penyusunan Deck'], quote: 'Percakapan tersebut terasa menyenangkan dan memberi saya pandangan baru.', reflection: 'Dari pengalaman saya mengenal Sampling', close: 'Tutup', enlarge: 'Lihat karya lebih besar', contribution: 'Kontribusi pribadi' },
    en: { about: 'About Me', creativity: 'Creativity', learning: 'What I would like to learn', interests: ['Research', 'Data Processing', 'Presentation Decks'], quote: 'Those conversations were enjoyable and gave me new perspectives.', reflection: 'Reflecting on getting to know Sampling', close: 'Close', enlarge: 'View larger artwork', contribution: 'Personal contribution' },
};

interface ApplicationContent {
    title: string;
    description: string;
    readMore: string;
    back: string;
    print: string;
    identity: string;
    firstChoice: string;
    secondChoice: string;
    thirdChoice: string;
    bureaus: string;
    navigation: string;
    evidence: string;
    evidenceLink: string;
    sections: { id: string; nav: string; title: string; paragraphs: string[] }[];
}

export const magang: Record<Locale, ApplicationContent> = {
    id: {
        title: 'Magang Mathcademy 2026',
        description: 'Perkenalan dan alasan saya ingin menjadi bagian dari Himpunan Mahasiswa Departemen Matematika.',
        readMore: 'Kenali Saya Lebih Dekat',
        back: 'Kembali ke Portofolio',
        print: 'Cetak / Simpan sebagai PDF',
        identity: 'Mahasiswa Matematika Universitas Indonesia angkatan 2026.',
        firstChoice: 'Pilihan pertama',
        secondChoice: 'Pilihan kedua',
        thirdChoice: 'Pilihan ketiga',
        bureaus: 'Biro yang dipilih',
        navigation: 'Bagian perkenalan magang',
        evidence: 'Pengalaman kreatif di portofolio',
        evidenceLink: 'Baca pengalaman penulisan naskah dan kru panggung',
        sections: [
            {
                id: 'introduction', nav: 'Perkenalan', title: 'Perkenalan diri',
                paragraphs: [
                    'Perkenalkan, saya Athalla Reinaldi, mahasiswa baru Program Studi Matematika di Universitas Indonesia. Memasuki masa perkuliahan, saya ingin memberi diri saya kesempatan untuk mencoba hal-hal baru dan mengenal lebih banyak orang. Salah satu langkah yang ingin saya ambil adalah mengikuti magang di Himpunan Mahasiswa Departemen Matematika.',
                    'Bagi saya, ada banyak hal yang baru bisa dipahami setelah dijalani. Karena itu, saya ingin mengenal kegiatan himpunan secara langsung, belajar dari kakak tingkat dan teman-teman, serta menemukan peran yang bisa saya jalankan dengan baik.',
                ],
            },
            {
                id: 'variansi', nav: 'Variansi', title: 'Mengapa Variansi menjadi pilihan pertama',
                paragraphs: [
                    'Ketertarikan saya terhadap Variansi bermula dari penjelasan Bang Rifki. Setelah mendengar penjelasannya, saya merasa bahwa Variansi bisa menjadi tempat untuk mengenal lebih jauh bidang yang memang ingin saya pelajari, terutama riset dan analisis.',
                    'Saya tertarik memahami bagaimana data dapat digunakan untuk menjawab sebuah pertanyaan. Selama ini, ketertarikan tersebut masih menjadi sesuatu yang ingin saya kembangkan. Melalui Variansi, saya berharap bisa belajar mengolah data dan menyusun hasilnya menjadi informasi yang mudah dipahami. Saya juga ingin belajar membuat deck yang runtut, sehingga hasil pekerjaan dapat tersampaikan dengan jelas kepada orang lain.',
                ],
            },
            {
                id: 'sampling', nav: 'Sampling', title: 'Mengapa saya juga tertarik pada Sampling',
                paragraphs: [
                    'Ketertarikan saya terhadap Sampling tumbuh dari beberapa kesempatan bertukar wawasan dengan kakak tingkat di dalamnya. Percakapan tersebut terasa menyenangkan dan memberi saya pandangan baru. Dari situ, muncul keinginan untuk mengenal Sampling lebih dekat dan ikut merasakan pengalaman berkegiatan bersama.',
                    'Saya berharap dapat menemukan lebih banyak kesempatan untuk berdiskusi, mengenal cara pandang yang berbeda, dan belajar bekerja sama. Bagi saya, keseruan itu menjadi alasan awal untuk tertarik, lalu ingin saya lanjutkan dengan keterlibatan secara langsung.',
                ],
            },
            {
                id: 'biner', nav: 'Biner', title: 'Mengapa saya tertarik pada Biner',
                paragraphs: [
                    'Sebagai mahasiswa baru, saya belum memiliki gambaran yang utuh tentang kehidupan setelah kuliah. Ada banyak hal yang ingin saya ketahui, mulai dari pilihan karier hingga bagaimana mempersiapkan diri untuk menjalaninya. Karena itu, saya tertarik pada Biner sebagai tempat untuk mulai mengenal dunia pascakampus dan kewirausahaan.',
                    'Saya ingin mendapat kesempatan untuk mendengar pengalaman alumni dan praktisi, bertanya, serta melihat berbagai kemungkinan yang bisa saya tempuh. Melalui keterlibatan dalam kegiatan Biner, saya juga berharap dapat belajar berkomunikasi dan bekerja sama dengan lebih baik. Bagi saya, pengalaman tersebut akan membantu saya mengenali arah yang ingin saya tuju, sambil mulai mempersiapkannya dari sekarang.',
                ],
            },
            {
                id: 'consideration', nav: 'Kesungguhan', title: 'Mengapa saya layak dipertimbangkan',
                paragraphs: [
                    'Saya masih berada di awal perjalanan sebagai mahasiswa, dan tentu masih banyak hal yang perlu saya pelajari. Namun, saya ingin menjalani kesempatan ini dengan sungguh-sungguh. Ketika mengambil sebuah tanggung jawab, saya berusaha menyelesaikannya sebaik mungkin dan bertanya apabila ada hal yang belum saya pahami.',
                    'Dari pengalaman sebelumnya, saya belajar bahwa niat baik perlu disertai kesediaan untuk mendengarkan, menerima masukan, dan memperbaiki pekerjaan. Hal tersebut ingin terus saya biasakan. Jika diberi kesempatan, saya berharap dapat menjadi anggota yang bisa diajak bekerja sama dan diandalkan dalam menjalankan tugas.',
                ],
            },
            {
                id: 'another-side', nav: 'Sisi lain', title: 'Sisi lain diri saya',
                paragraphs: [
                    'Di luar ketertarikan terhadap matematika dan analisis, saya juga senang terlibat dalam kegiatan kreatif, terutama menulis dan pertunjukan. Ada kepuasan tersendiri ketika sebuah ide yang awalnya hanya dibicarakan perlahan menjadi sesuatu yang bisa dilihat dan dinikmati bersama.',
                    'Pengalaman tersebut membuat saya ingin terus mencoba, termasuk pada hal-hal yang belum terlalu saya kuasai. Saya berharap magang ini dapat menjadi salah satu kesempatan untuk melakukannya, sambil mengenal diri sendiri dan orang-orang di sekitar saya dengan lebih baik.',
                ],
            },
        ],
    },
    en: {
        title: 'Mathcademy Internship 2026',
        description: 'An introduction and why I would like to be part of the Mathematics Department Student Association.',
        readMore: 'Get to Know Me Better',
        back: 'Back to Portfolio',
        print: 'Print / Save as PDF',
        identity: 'Mathematics student at Universitas Indonesia, class of 2026.',
        firstChoice: 'First choice',
        secondChoice: 'Second choice',
        thirdChoice: 'Third choice',
        bureaus: 'Selected bureaus',
        navigation: 'Internship introduction sections',
        evidence: 'Creative experience in my portfolio',
        evidenceLink: 'Read about my scriptwriting and stage crew experience',
        sections: [
            {
                id: 'introduction', nav: 'Introduction', title: 'A little about me',
                paragraphs: [
                    'My name is Athalla Reinaldi, and I am a new Mathematics student at Universitas Indonesia. As I begin university life, I want to give myself the chance to try new things and get to know more people. One step I would like to take is joining the internship at the Mathematics Department Student Association.',
                    'I feel that some things only become clear once we experience them ourselves. That is why I want to get to know the association’s activities firsthand, learn from senior students and friends, and find a role I can contribute to well.',
                ],
            },
            {
                id: 'variansi', nav: 'Variansi', title: 'Why Variansi is my first choice',
                paragraphs: [
                    'My interest in Variansi began with an explanation from Bang Rifki. After hearing what he shared, I felt that Variansi could be a place to explore areas I genuinely want to learn more about, especially research and analysis.',
                    'I am interested in understanding how data can help answer a question. So far, this is still an interest I want to develop further. Through Variansi, I hope to learn how to process data and turn the results into information that is easy to understand. I would also like to learn to put together well-structured presentation decks, so that the work can be communicated clearly to others.',
                ],
            },
            {
                id: 'sampling', nav: 'Sampling', title: 'Why I am also interested in Sampling',
                paragraphs: [
                    'My interest in Sampling grew through a few opportunities to exchange ideas with senior students who are part of it. Those conversations were enjoyable and gave me new perspectives. They made me want to get to know Sampling better and experience taking part in activities together.',
                    'I hope to find more opportunities to talk things through, discover different points of view, and learn to work with others. For me, that sense of enjoyment sparked my interest, and I would like to follow it up by getting involved directly.',
                ],
            },
            {
                id: 'biner', nav: 'Biner', title: 'Why I am interested in Biner',
                paragraphs: [
                    'As a new university student, I do not yet have a complete picture of life after graduation. There is a lot I would like to know, from career options to how I can prepare for them. That is why I am interested in Biner as a place to start exploring life after university and entrepreneurship.',
                    'I would like the opportunity to hear from alumni and practitioners, ask questions, and discover the different paths I could take. By getting involved in Biner’s activities, I also hope to learn to communicate and work with others better. For me, these experiences would help me discover the direction I want to take, while starting to prepare for it now.',
                ],
            },
            {
                id: 'consideration', nav: 'Commitment', title: 'Why I hope to be considered',
                paragraphs: [
                    'I am still at the beginning of my journey as a university student, and there is certainly a lot I need to learn. Even so, I want to take this opportunity seriously. When I take on a responsibility, I try to complete it as well as I can and ask questions when there is something I do not understand.',
                    'From previous experiences, I have learned that good intentions need to be accompanied by a willingness to listen, accept feedback, and improve the work. Those are habits I want to keep building. If given the opportunity, I hope to be someone who is easy to work with and can be relied on to carry out their tasks.',
                ],
            },
            {
                id: 'another-side', nav: 'Another side', title: 'Another side of me',
                paragraphs: [
                    'Beyond my interest in mathematics and analysis, I also enjoy being involved in creative activities, especially writing and performances. There is a particular satisfaction in watching an idea that started as a conversation gradually become something people can see and enjoy together.',
                    'Those experiences make me want to keep trying, including things I am not very familiar with yet. I hope this internship can be one opportunity to do that, while getting to know myself and the people around me a little better.',
                ],
            },
        ],
    },
};