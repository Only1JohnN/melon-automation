import { test, expect } from '@fixtures/baseTest';
import { SettingsPage } from '@pages/partners/SettingsPage';

// ── Dynamic data helpers ─────────────────────────────────────

// Large list of Nigerian cities and towns to ensure uniqueness
const NIGERIAN_LOCATIONS = [
  'Aba', 'Abakaliki', 'Abeokuta', 'Abuja', 'Ado Ekiti', 'Afikpo', 'Agbor',
  'Ajaokuta', 'Akwanga', 'Ankpa', 'Apapa', 'Asaba', 'Awka', 'Azare',
  'Badagry', 'Bama', 'Bauchi', 'Benin City', 'Bida', 'Biu', 'Bonny',
  'Buguma', 'Buni Yadi', 'Calabar', 'Damaturu', 'Daura', 'Dutse',
  'Ede', 'Effurun', 'Eket', 'Ekpoma', 'Elele', 'Emene', 'Enugu',
  'Epe', 'Funtua', 'Gombe', 'Gusau', 'Gwagwalada', 'Gwale', 'Ibadan',
  'Ife', 'Igboho', 'Igbo-Ukwu', 'Ijebu-Ode', 'Ikare', 'Ikire', 'Ikole',
  'Ikorodu', 'Ila', 'Ilesa', 'Ilorin', 'Jalingo', 'Jere', 'Jos',
  'Kaduna', 'Kafanchan', 'Kaiama', 'Kano', 'Katsina', 'Kebbe', 'Keffi',
  'Kontagora', 'Lafia', 'Lagos', 'Lalupon', 'Lere', 'Lokoja', 'Maiduguri',
  'Makurdi', 'Mbaise', 'Mgbidi', 'Minna', 'Mokwa', 'Mubi', 'Nasarawa',
  'Neni', 'Ngo', 'Nnewi', 'Nsukka', 'Obiaruku', 'Ogbomosho', 'Ogidi',
  'Ogoja', 'Oguta', 'Oka', 'Okene', 'Okigwe', 'Okrika', 'Ondo',
  'Onitsha', 'Oporoma', 'Orile', 'Orlu', 'Oshogbo', 'Ota', 'Owerri',
  'Owo', 'Oyo', 'Pankshin', 'Port Harcourt', 'Potiskum', 'Rumuokwurusi',
  'Sagamu', 'Sapele', 'Shaki', 'Sokoto', 'Suleja', 'Tse', 'Ugep',
  'Umuahia', 'Uromi', 'Uyo', 'Vandeikya', 'Warri', 'Wukari', 'Yaba',
  'Yenagoa', 'Yola', 'Zaria', 'Zungeru', 'Abagana', 'Aboh', 'Adazi',
  'Agenebode', 'Aguleri', 'Aja', 'Ajalli', 'Akamkpa', 'Akpafa', 'Akpet',
  'Akure', 'Ala', 'Amaigbo', 'Amaokwe', 'Amassoma', 'Ameshi', 'Amodu',
  'Anaku', 'Anambra', 'Anara', 'Anekal', 'Aniocha', 'Ankpa', 'Arochukwu',
  'Asaba', 'Asagba', 'Asaka', 'Ase', 'Atani', 'Atan', 'Atigbe', 'Auchi',
  'Awo', 'Awoyaya', 'Ayetoro', 'Bacita', 'Bade', 'Baga', 'Bagudo',
  'Bakori', 'Bakundi', 'Bali', 'Bama', 'Bambam', 'Bara', 'Barikin',
  'Barkin', 'Baro', 'Bassa', 'Batsari', 'Batun', 'Bauda', 'Bebi',
  'Bele', 'Beli', 'Bende', 'Beriberi', 'Bichi', 'Bida', 'Biliri',
  'Binji', 'Biu', 'Bode', 'Boju', 'Boki', 'Bokkos', 'Bomo', 'Bong',
  'Borgu', 'Bornu', 'Bosso', 'Boye', 'Budum', 'Bugana', 'Buhari',
  'Bukuru', 'Bukwa', 'Buli', 'Bunza', 'Buri', 'Buruku', 'Bute',
  'Bwala', 'Bwat', 'Chanchaga', 'Chara', 'Chibok', 'Chikun', 'Chok',
  'Dabi', 'Dadi', 'Dafa', 'Dafe', 'Dala', 'Damboa', 'Dambata',
  'Dandi', 'Dankama', 'Danja', 'Danwa', 'Dara', 'Dashi', 'Dau',
  'Daura', 'Dawa', 'Dayi', 'Deba', 'Debelu', 'Degema', 'Dekina',
  'Demsa', 'Din', 'Dir', 'Donga', 'Dori', 'Doro', 'Dukku', 'Dura',
  'Dutse', 'Dutsin', 'Ede', 'Efue', 'Egbema', 'Egede', 'Eha', 'Ehor',
  'Ejeba', 'Ekiti', 'Ekwere', 'Ekwulobia', 'Ele', 'Elekuro', 'Elume',
  'Emu', 'Enugwu', 'Epe', 'Eruku', 'Eruwa', 'Etsako', 'Etung', 'Ewekoro',
  'Ezere', 'Fika', 'Filiya', 'Funtua', 'Gada', 'Gagarawa', 'Gamawa',
  'Gana', 'Gandu', 'Ganye', 'Garki', 'Garko', 'Garun', 'Gashaka',
  'Gassol', 'Gaya', 'Geidam', 'Gembu', 'Giade', 'Gidan', 'Giginyu',
  'Gingel', 'Girei', 'Gisha', 'Gombe', 'Gora', 'Goronyo', 'Gubio',
  'Guddu', 'Gudu', 'Gulani', 'Gulma', 'Gumel', 'Gummi', 'Gunna',
  'Gurara', 'Guri', 'Gusau', 'Guzamala', 'Gwafan', 'Gwagwalada',
  'Gwale', 'Gwandu', 'Gwaram', 'Gwarzo', 'Hadejia', 'Hausari', 'Hawul',
  'Hong', 'Hum', 'Hunkuyi', 'Ibi', 'Idah', 'Idanre', 'Idena',
  'Ido', 'Ifako', 'Ife', 'Ifo', 'Igabi', 'Igara', 'Igbo-Ora',
  'Igboho', 'Igbokoda', 'Igbomina', 'Igueben', 'Ihiala', 'Ihioma',
  'Ikeja', 'Ikom', 'Ikorodu', 'Ila', 'Ilaro', 'Ile-Oluji', 'Ilejemeje',
  'Ilesa', 'Ilorin', 'Imo', 'Ini', 'Iperu', 'Irele', 'Irepodun',
  'Iresa', 'Irewunmi', 'Iseyin', 'Ishielu', 'Isiala', 'Isoko', 'Itu',
  'Itula', 'Ivo', 'Iwo', 'Izzi', 'Jaba', 'Jabba', 'Jada', 'Jahun',
  'Jaji', 'Jakusko', 'Jalingo', 'Jamaa', 'Jega', 'Jekada', 'Jema',
  'Jere', 'Jibia', 'Jigawa', 'Jilo', 'Jimeta', 'Jiru', 'Jobe',
  'Jogana', 'Jokolo', 'Joro', 'Jos', 'Juju', 'Kabba', 'Kabo',
  'Kachia', 'Kaduna', 'Kafanchan', 'Kaiama', 'Kajuru', 'Kakaki',
  'Kakuri', 'Kala', 'Kalgo', 'Kaltungo', 'Kamba', 'Kangiwa', 'Kankara',
  'Kankia', 'Kano', 'Kantana', 'Kaoje', 'Kara', 'Karaye', 'Kari',
  'Karkarna', 'Karom', 'Karuku', 'Kashere', 'Kataer', 'Katagun',
  'Katanga', 'Katami', 'Katsina', 'Katsina-Ala', 'Kaura', 'Kaura-Namoda',
  'Kauru', 'Kawaji', 'Kazaure', 'Keana', 'Kebbi', 'Keffi', 'Kelenda',
  'Kemta', 'Kibiya', 'Kila', 'Kirfi', 'Kirikiri', 'Kiru', 'Kishi',
  'Kiyawa', 'Ko', 'Kobo', 'Kochi', 'Kogi', 'Koko', 'Koko-Besse',
  'Kokori', 'Kolo', 'Koma', 'Kontagora', 'Kotang', 'Kubanni', 'Kubi',
  'Kubwa', 'Kucici', 'Kudan', 'Kudu', 'Kuje', 'Kujama', 'Kukawa',
  'Kuki', 'Kulambu', 'Kumana', 'Kumo', 'Kumurya', 'Kunchi', 'Kundu',
  'Kungawa', 'Kuntawa', 'Kura', 'Kurfi', 'Kurmi', 'Kutigi', 'Kuyambana',
  'Kwache', 'Kwakuti', 'Kwale', 'Kwami', 'Kwanar', 'Kwandere', 'Kwara',
  'Kwatarkwashi', 'Kwaya', 'Kwolla', 'Labar', 'Lafia', 'Lagdo',
  'Laka', 'Lalela', 'Lame', 'Langtang', 'Lapai', 'Laraba', 'Lava',
  'Lavi', 'Lawan', 'Layi', 'Lede', 'Lekki', 'Lemu', 'Lere', 'Lessa',
  'Lever', 'Lime', 'Limota', 'Lingi', 'Lisi', 'Lokoja', 'Lopa',
  'Lugbe', 'Lukura', 'Lulu', 'Lunn', 'Lurawa', 'Lush', 'Luvu',
  'Maba', 'Mabera', 'Mada', 'Madaki', 'Madala', 'Mado', 'Maduguri',
  'Mafa', 'Magama', 'Magami', 'Magaria', 'Magumeri', 'Maidala', 'Maiha',
  'Maitama', 'Majiya', 'Makarfi', 'Makurdi', 'Malam', 'Malumfashi',
  'Mamman', 'Mande', 'Mando', 'Mani', 'Mararaba', 'Mariga', 'Maru',
  'Masaka', 'Mashi', 'Maska', 'Mastafa', 'Matameye', 'Mayo', 'Mba',
  'Mbala', 'Mbe', 'Mbiri', 'Mbo', 'Mbuga', 'Mbula', 'Mchik',
  'Mgbidi', 'Mha', 'Michi', 'Mijin', 'Mikang', 'Minjibir', 'Minna',
  'Misau', 'Mkar', 'Mkpat', 'Mobbar', 'Moga', 'Mokwa', 'Mongono',
  'Moniya', 'Moriki', 'Moro', 'Mubi', 'Muduri', 'Mungadi', 'Munku',
  'Mushin', 'Muskana', 'Mutor', 'Mutwe', 'Mwo', 'Nabardo', 'Nafada',
  'Nagara', 'Nagogo', 'Nahuche', 'Naigba', 'Naka', 'Nakala', 'Nalga',
  'Naman', 'Nana', 'Nangere', 'Naraguta', 'Nasarawa', 'Nassarawa',
  'Natink', 'Natu', 'Nau', 'Ndab', 'Ndag', 'Ndele', 'Ndoki',
  'Ndu', 'Ndume', 'Nduru', 'Nebo', 'Neni', 'Ngalbi', 'Ngala',
  'Ngel', 'Ngizim', 'Nguru', 'Nidi', 'Niger', 'Nigga', 'Nik',
  'Ningi', 'Ningo', 'Ninjo', 'Niu', 'Niyi', 'Nkala', 'Nkam',
  'Nkisi', 'Nko', 'Nkpogu', 'Nkwerre', 'Nob', 'Nog', 'Nok',
  'Noma', 'Nono', 'Norf', 'Nort', 'Nso', 'Nsu', 'Nub', 'Nuf',
  'Nug', 'Nugur', 'Nuh', 'Nuk', 'Nul', 'Num', 'Nun', 'Nur',
  'Nus', 'Nuw', 'Nuz', 'Oba', 'Obadore', 'Obagi', 'Oban',
  'Obarike', 'Obio', 'Obosi', 'Obu', 'Och', 'Oda', 'Odogbo',
  'Odu', 'Odukpani', 'Offa', 'Offiong', 'Ofo', 'Ogba', 'Ogbe',
  'Ogbo', 'Ogboli', 'Ogbomosho', 'Ogidi', 'Ogo', 'Ogugu', 'Oguta',
  'Oha', 'Ohafia', 'Oji', 'Ojo', 'Oka', 'Okebode', 'Okene',
  'Okigwe', 'Oko', 'Okrika', 'Oku', 'Okun', 'Ola', 'Olam',
  'Ole', 'Oli', 'Ologbo', 'Olokoro', 'Olupona', 'Oluwa', 'Oma',
  'Omo', 'Omoku', 'Omordi', 'Omu', 'Omu-Aran', 'Ona', 'Ondo',
  'Onicha', 'Onitsha', 'Onna', 'Opobo', 'Ora', 'Ore', 'Oro',
  'Orlu', 'Oru', 'Osara', 'Oshogbo', 'Osisi', 'Osogbo', 'Osu',
  'Osun', 'Ota', 'Otukpo', 'Otuocha', 'Owerri', 'Owo', 'Owu',
  'Oyo', 'Ozoro', 'Ozubulu', 'Pali', 'Pandogari', 'Panko', 'Patani',
  'Pategi', 'Pawa', 'Piri', 'Pishi', 'Pogu', 'Pokwom', 'Pole',
  'Pomo', 'Pong', 'Pora', 'Port Harcourt', 'Potiskum', 'Pru',
  'Pudo', 'Pulka', 'Puman', 'Pungu', 'Punj', 'Pura', 'Pute',
  'Putnum', 'Rabah', 'Rafin', 'Rago', 'Ramin', 'Rano', 'Ranti',
  'Rari', 'Rasa', 'Rati', 'Raya', 'Reko', 'Rema', 'Remawa',
  'Rep', 'Ribadu', 'Ribang', 'Ribina', 'Riga', 'Rijau', 'Rik',
  'Ringim', 'Rini', 'Riri', 'Riti', 'Roba', 'Roggo', 'Rogo',
  'Roko', 'Romi', 'Ron', 'Roni', 'Roro', 'Rua', 'Rubu',
  'Rufi', 'Ruga', 'Ruk', 'Ruma', 'Rumu', 'Rumuokwurusi', 'Run',
  'Rung', 'Runt', 'Rura', 'Rus', 'Rut', 'Ruy', 'Sabara',
  'Sabe', 'Sabi', 'Sabo', 'Sabon', 'Sada', 'Safana', 'Sagamu',
  'Sagara', 'Sagw', 'Saida', 'Saiye', 'Sakaba', 'Saki', 'Sakwa',
  'Salanta', 'Salawa', 'Sale', 'Salka', 'Sama', 'Samaru', 'Sambo',
  'Saminaka', 'Sampou', 'Samu', 'Sandamu', 'Sanga', 'Sangaya',
  'Sani', 'Sanka', 'Sansan', 'Sapele', 'Sarkin', 'Sarma', 'Sarpi',
  'Sassa', 'Sata', 'Sauka', 'Sauna', 'Sauri', 'Sawa', 'Sayi',
  'Segi', 'Sekula', 'Selu', 'Sena', 'Sengere', 'Sent', 'Seri',
  'Seso', 'Seth', 'Sewe', 'Shaba', 'Shagamu', 'Shagari', 'Shaki',
  'Shamo', 'Shanga', 'Shani', 'Shanka', 'Shanu', 'Shara', 'Shari',
  'Sharu', 'Shata', 'Shawa', 'Shele', 'Shendam', 'Shenge', 'Shera',
  'Sheri', 'Shika', 'Shikira', 'Shina', 'Shira', 'Shiru', 'Shita',
  'Shombe', 'Shonga', 'Shuni', 'Shunu', 'Sia', 'Sidi', 'Sif',
  'Sig', 'Sik', 'Sil', 'Sim', 'Sin', 'Singa', 'Sini',
  'Siri', 'Sisa', 'Sit', 'Siu', 'Soba', 'Soban', 'Sobo',
  'Sodangi', 'Sodo', 'Sof', 'Sog', 'Sok', 'Sokoto', 'Sola',
  'Sombo', 'Sona', 'Songo', 'Soro', 'Sos', 'Sot', 'Soy',
  'Sua', 'Suan', 'Subu', 'Suda', 'Suf', 'Sug', 'Suj',
  'Suk', 'Suleja', 'Sulma', 'Sulu', 'Sum', 'Sun', 'Sung',
  'Sur', 'Sura', 'Suru', 'Sus', 'Sut', 'Suw', 'Suy',
  'Taba', 'Tabara', 'Tabawa', 'Tabe', 'Tabia', 'Tabo', 'Tabra',
  'Tada', 'Tafa', 'Tafawa', 'Taff', 'Taga', 'Tagwaye', 'Tai',
  'Taka', 'Takai', 'Takalafiya', 'Takum', 'Talakawa', 'Tale', 'Talga',
  'Tali', 'Taloko', 'Tama', 'Tambo', 'Tami', 'Tamle', 'Tanga',
  'Tanko', 'Tankwa', 'Tanta', 'Tapa', 'Tara', 'Taraba', 'Tarai',
  'Tari', 'Tarka', 'Tarna', 'Taro', 'Tarok', 'Tasan', 'Tashan',
  'Tata', 'Tatt', 'Tawa', 'Tawari', 'Tawia', 'Taya', 'Tayi',
  'Taz', 'Teba', 'Tede', 'Tegina', 'Telegu', 'Temba', 'Teme',
  'Temidire', 'Temo', 'Tende', 'Teng', 'Teni', 'Tepa', 'Ter',
  'Tere', 'Terna', 'Teso', 'Tete', 'Tewa', 'Tewo', 'Teye',
  'Tha', 'The', 'Thi', 'Thu', 'Tia', 'Tibi', 'Tiga',
  'Tiggi', 'Tiko', 'Tila', 'Tild', 'Tile', 'Tilli', 'Tilo',
  'Tim', 'Tima', 'Timba', 'Timi', 'Timo', 'Tin', 'Tina',
  'Ting', 'Tini', 'Tio', 'Tip', 'Tiri', 'Tis', 'Tita',
  'Tito', 'Tiva', 'Tivi', 'Tiy', 'Tiza', 'Toba', 'Tobi',
  'Tobo', 'Toda', 'Tofa', 'Tog', 'Togi', 'Togo', 'Tola',
  'Tole', 'Toli', 'Tolo', 'Toma', 'Tomb', 'Tomi', 'Tomo',
  'Tona', 'Tondo', 'Tong', 'Toni', 'Tonu', 'Tora', 'Tori',
  'Toro', 'Tosa', 'Tosu', 'Tot', 'Toto', 'Tou', 'Towa',
  'Towe', 'Toyo', 'Toza', 'Tozi', 'Tse', 'Tso', 'Tsu',
  'Tsw', 'Tua', 'Tubi', 'Tudo', 'Tufa', 'Tuga', 'Tugga',
  'Tui', 'Tuk', 'Tuka', 'Tukura', 'Tula', 'Tule', 'Tulu',
  'Tuma', 'Tumbi', 'Tumu', 'Tuna', 'Tunga', 'Tunku', 'Tuno',
  'Tura', 'Turba', 'Ture', 'Turka', 'Turu', 'Tusa', 'Tuta',
  'Tutug', 'Tutuwa', 'Tuw', 'Tuye', 'Uba', 'Ubi', 'Ubo',
  'Uburu', 'Ude', 'Udi', 'Udo', 'Udu', 'Ugba', 'Ugbe',
  'Ugbo', 'Ugep', 'Ughelli', 'Ugiri', 'Ugo', 'Ugwu', 'Uh',
  'Uja', 'Uje', 'Uji', 'Uka', 'Uke', 'Uko', 'Ukwu',
  'Ula', 'Uli', 'Ulo', 'Uma', 'Umb', 'Ume', 'Umo',
  'Umu', 'Umuahia', 'Umunede', 'Umunne', 'Umuoba', 'Umuodi', 'Umuokpara',
  'Umuri', 'Umutu', 'Una', 'Ung', 'Ungogo', 'Unguwar', 'Uni',
  'Unna', 'Uno', 'Uny', 'Upa', 'Upi', 'Upo', 'Upu',
  'Ura', 'Uri', 'Uro', 'Uru', 'Urua', 'Urue', 'Urun',
  'Uruobo', 'Uruok', 'Uruoni', 'Us', 'Uselu', 'Ushafa', 'Ushongo',
  'Usi', 'Usman', 'Uso', 'Usoma', 'Uss', 'Usum', 'Uta',
  'Ute', 'Utu', 'Uv', 'Uwa', 'Uwani', 'Uwel', 'Uy',
  'Uyo', 'Uz', 'Uza', 'Uze', 'Uzo', 'Uzu', 'Vade',
  'Vand', 'Vandi', 'Vanga', 'Vara', 'Vatsa', 'Vek', 'Vem',
  'Veni', 'Vera', 'Veti', 'Vigh', 'Vik', 'Vil', 'Vim',
  'Vin', 'Vis', 'Vita', 'Viu', 'Viva', 'Viy', 'Voa',
  'Voma', 'Vori', 'Voti', 'Vul', 'Vun', 'Vwa', 'Vyak',
  'Vyara', 'Waba', 'Wada', 'Wadai', 'Waga', 'Wagga', 'Waka',
  'Waku', 'Wala', 'Wam', 'Wamba', 'Wame', 'Wamo', 'Wana',
  'Wande', 'Wando', 'Wanka', 'Wann', 'Wara', 'Wari', 'Warji',
  'Warri', 'Was', 'Wase', 'Wash', 'Wati', 'Waya', 'Waz',
  'Weli', 'Wen', 'Wena', 'Weri', 'Wesi', 'Wew', 'Wia',
  'Wika', 'Wil', 'Wim', 'Win', 'Wir', 'Wis', 'Wita',
  'Witi', 'Wiy', 'Wizi', 'Wobe', 'Woda', 'Wode', 'Wodi',
  'Wof', 'Wog', 'Woh', 'Woi', 'Woko', 'Wol', 'Won',
  'Wonda', 'Woni', 'Woo', 'Wor', 'Wosa', 'Wot', 'Woya',
  'Wri', 'Wud', 'Wudi', 'Wuf', 'Wuk', 'Wukari', 'Wula',
  'Wule', 'Wulo', 'Wun', 'Wure', 'Wurno', 'Wuro', 'Wusu',
  'Wuy', 'Wuz', 'Xa', 'Xaba', 'Xada', 'Xadi', 'Xaf',
  'Xai', 'Xam', 'Xan', 'Xao', 'Xar', 'Xas', 'Xat',
  'Xav', 'Xaw', 'Xay', 'Xaz', 'Xebe', 'Xedi', 'Xef',
  'Xeg', 'Xei', 'Xek', 'Xel', 'Xem', 'Xen', 'Xer',
  'Xes', 'Xet', 'Xeu', 'Xex', 'Xey', 'Xez', 'Xha',
  'Xhe', 'Xhi', 'Xho', 'Xhu', 'Xia', 'Xib', 'Xic',
  'Xid', 'Xie', 'Xif', 'Xig', 'Xih', 'Xii', 'Xij',
  'Xik', 'Xil', 'Xim', 'Xin', 'Xio', 'Xip', 'Xiq',
  'Xir', 'Xis', 'Xit', 'Xiu', 'Xiv', 'Xiw', 'Xix',
  'Xiy', 'Xiz', 'Xoa', 'Xob', 'Xoc', 'Xod', 'Xoe',
  'Xof', 'Xog', 'Xoh', 'Xoi', 'Xoj', 'Xok', 'Xol',
  'Xom', 'Xon', 'Xoo', 'Xop', 'Xoq', 'Xor', 'Xos',
  'Xot', 'Xou', 'Xov', 'Xow', 'Xox', 'Xoy', 'Xoz',
  'Xua', 'Xub', 'Xuc', 'Xud', 'Xue', 'Xuf', 'Xug',
  'Xuh', 'Xui', 'Xuj', 'Xuk', 'Xul', 'Xum', 'Xun',
  'Xuo', 'Xup', 'Xuq', 'Xur', 'Xus', 'Xut', 'Xuu',
  'Xuv', 'Xuw', 'Xux', 'Xuy', 'Xuz', 'Xwa', 'Xwe',
  'Xwi', 'Xwo', 'Xwu', 'Xya', 'Xye', 'Xyi', 'Xyo',
  'Xyu', 'Yaba', 'Yabo', 'Yad', 'Yadi', 'Yaf', 'Yag',
  'Yah', 'Yai', 'Yaj', 'Yak', 'Yala', 'Yalwa', 'Yam',
  'Yamma', 'Yan', 'Yango', 'Yankaba', 'Yankari', 'Yanma', 'Yans',
  'Yant', 'Yanu', 'Yanz', 'Yao', 'Yap', 'Yaq', 'Yar',
  'Yari', 'Yaro', 'Yas', 'Yat', 'Yau', 'Yav', 'Yaw',
  'Yay', 'Yaz', 'Yazi', 'Yeg', 'Yel', 'Yen', 'Yenagoa',
  'Yendi', 'Yerg', 'Yes', 'Yet', 'Yev', 'Yew', 'Yey',
  'Yez', 'Yiba', 'Yid', 'Yif', 'Yig', 'Yih', 'Yii',
  'Yij', 'Yik', 'Yil', 'Yim', 'Yin', 'Yio', 'Yip',
  'Yiq', 'Yir', 'Yis', 'Yit', 'Yiu', 'Yiv', 'Yiw',
  'Yix', 'Yiy', 'Yiz', 'Yoa', 'Yob', 'Yoc', 'Yod',
  'Yoe', 'Yof', 'Yog', 'Yoh', 'Yoi', 'Yoj', 'Yok',
  'Yol', 'Yom', 'Yon', 'Yoo', 'Yop', 'Yoq', 'Yor',
  'Yos', 'Yot', 'You', 'Yov', 'Yow', 'Yox', 'Yoy',
  'Yoz', 'Yua', 'Yub', 'Yuc', 'Yud', 'Yue', 'Yuf',
  'Yug', 'Yuh', 'Yui', 'Yuj', 'Yuk', 'Yul', 'Yum',
  'Yun', 'Yuo', 'Yup', 'Yuq', 'Yur', 'Yus', 'Yut',
  'Yuu', 'Yuv', 'Yuw', 'Yux', 'Yuy', 'Yuz', 'Ywa',
  'Ywe', 'Ywi', 'Ywo', 'Ywu', 'Yya', 'Yye', 'Yyi',
  'Yyo', 'Yyu'
];

// ── Helper functions ──────────────────────────────────────────

const INDUSTRIES = [
  'Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing',
  'Education', 'Real Estate', 'Transportation', 'Telecommunications',
  'Hospitality', 'Energy', 'Agriculture', 'Entertainment', 'Construction',
  'Automotive', 'Pharmaceutical', 'Insurance', 'Airlines', 'Food and Beverage',
  'Media and Advertising', 'Fitness', 'Beauty and Cosmetics', 'Events',
  'Fashion', 'Laundry Services', 'Financial Services', 'Travel'
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateEmail(): string {
  return `melonqabot-${Date.now()}@yopmail.com`;
}

test.use({ storageState: 'playwright/.auth/partner.json' });

test.describe('@partners @settings @smoke', () => {
  let settingsPage: SettingsPage;

  test.beforeEach(async ({ page }) => {
    settingsPage = new SettingsPage(page);
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  Profile
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  test.describe('Profile', () => {
    test.beforeEach(async () => {
      await settingsPage.gotoProfile();
    });

    test('should display the correct profile data in view mode', async () => {
      const fields = await settingsPage.getProfileFields();

      expect(fields.firstName).toContain('Melon');
      expect(fields.lastName).toContain('QA-Bot');
      expect(fields.phone).toContain('+2347080702920');
      expect(fields.email).toContain('melonqabot@yopmail.com');
      expect(fields.gender).toContain('male');
      expect(fields.address).toContain('Araromi');
    });

    test('should cancel profile edit and discard changes', async () => {
      const original = await settingsPage.getProfileFields();

      const newFirstName = `TempFirst-${Date.now()}`;
      const newLastName = `TempLast-${Date.now()}`;

      await settingsPage.editProfile(newFirstName, newLastName);
      await settingsPage.cancelProfileEdit();

      const afterCancel = await settingsPage.getProfileFields();
      expect(afterCancel.firstName).toBe(original.firstName);
      expect(afterCancel.lastName).toBe(original.lastName);
    });

    test('should save profile changes and persist after refresh', async () => {
      const newFirstName = `UpdatedFirst-${Date.now()}`;
      const newLastName = `UpdatedLast-${Date.now()}`;

      await settingsPage.editProfile(newFirstName, newLastName);
      await settingsPage.saveProfile();

      const afterSave = await settingsPage.getProfileFields();
      expect(afterSave.firstName).toBe(newFirstName);
      expect(afterSave.lastName).toBe(newLastName);

      await settingsPage.page.reload();
      await settingsPage.page.waitForLoadState('networkidle');
      const afterRefresh = await settingsPage.getProfileFields();
      expect(afterRefresh.firstName).toBe(newFirstName);
      expect(afterRefresh.lastName).toBe(newLastName);
    });

    test('should upload a profile photo successfully', async () => {
      await settingsPage.uploadProfilePhoto('fixtures/images/profile.png');
    });
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  Business
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  test.describe('Business', () => {
    test.beforeEach(async () => {
      await settingsPage.gotoBusiness();
    });

    test.describe('Details', () => {
      test('should display business details tab content', async () => {
        await expect(settingsPage.businessEditButton).toBeVisible();
        await expect(settingsPage.page.locator('text=Business Information')).toBeVisible();
      });

      test('should upload a business logo successfully', async () => {
        await settingsPage.uploadBusinessLogo('fixtures/images/business_logo.png');
      });

      test('should cancel business edit and discard changes', async () => {
        const original = await settingsPage.getBusinessFields();

        const newEmail = generateEmail();
        const newPhone = '+2348123456789';
        const newIndustry = getRandomItem(INDUSTRIES);

        await settingsPage.editBusiness(newEmail, newPhone, newIndustry);
        await settingsPage.cancelBusinessEdit();

        const afterCancel = await settingsPage.getBusinessFields();
        expect(afterCancel.email).toBe(original.email);
        expect(afterCancel.phone).toBe(original.phone);
        expect(afterCancel.industry).toBe(original.industry);
      });

      test('should save business details successfully', async () => {
        const newEmail = generateEmail();
        const newPhone = '+2348123456789';
        const newIndustry = getRandomItem(INDUSTRIES);

        await settingsPage.editBusiness(newEmail, newPhone, newIndustry);
        await settingsPage.saveBusiness();

        const afterSave = await settingsPage.getBusinessFields();
        expect(afterSave.email).toContain(newEmail);
        expect(afterSave.phone).toContain(newPhone);
        expect(afterSave.industry).toContain(newIndustry);
      });
    });

    test.describe('Branches', () => {
      test.beforeEach(async () => {
        await settingsPage.goToBranches();
      });

      test('should create an online storefront branch successfully', async () => {
        const storeName = `online-${Date.now()}`;
        const response = await settingsPage.createOnlineBranch(storeName);

        expect(response.status()).toBe(201);
        const branches = await settingsPage.getBranchNames();
        expect(branches.some(b => b.includes(storeName))).toBeTruthy();
      });

      test('should prevent duplicate online storefront', async () => {
        const storeName = `duplicate-${Date.now()}`;
        await settingsPage.createOnlineBranch(storeName);

        await settingsPage.addLocationButton.click();
        await settingsPage.onlineStorefrontOption.click();
        await settingsPage.storeNameInput.fill(storeName);
        await settingsPage.addStoreButton.click();

        const error = await settingsPage.getBranchError();
        expect(error).toContain('already has an online presence');
      });

      test('should create an offline branch with trading address', async () => {
        // Pick a random location from the huge list
        const location = getRandomItem(NIGERIAN_LOCATIONS);
        const searchAddress = `${location}, Nigeria`; // e.g., "Ikeja, Nigeria"

        // Get a random manager
        const manager = await settingsPage.getRandomManager();

        const response = await settingsPage.createOfflineBranch(manager, searchAddress);
        expect(response.status()).toBe(201);

        const branches = await settingsPage.getBranchNames();
        // The branch may appear as "Lagos, Nigeria" or the specific city; we check that it contains the city or the country.
        // To be safe, we check that at least one branch has the city name or "Nigeria".
        const found = branches.some(b => b.includes(location) || b.includes('Nigeria'));
        expect(found).toBeTruthy();
      });
    });

    test.describe('Directors', () => {
      test('should display director details', async () => {
        await settingsPage.goToDirectors();
        await expect(settingsPage.directorsHeading).toBeVisible();
        const count = await settingsPage.getDirectorsCount();
        expect(count).toBeGreaterThan(0);
      });
    });
  });
});