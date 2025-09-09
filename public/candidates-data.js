// Datos estáticos de los candidatos (información que no se modifica)
const candidatesStaticData = {
    "Camila Jiménez Sáez": {
        profession: "comunicacion",
        initials: "CJ",
        gradient: "from-pink-400 to-purple-500",
        education: "Magíster en Ciencias Sociales, Comunicadora Social",
        experience: "+4 años consultora en inclusión social",
        phone: "3017545682",
        email: "camilajimenezsaez@gmail.com",
        profile: "Defensora de los derechos humanos e investigadora social con experiencia en temas de género, inclusión y diversidad. Gran interés en comunicación organizacional y desarrollo social.",
        fullExperience: [
            "• <strong>Presentadora en Profamilia</strong> (2023-Actualidad) - Conducción de programas educativos sobre salud sexual y reproductiva",
            "• <strong>Asesora de comunicaciones RTVC</strong> (2023-2024) - Estrategias comunicacionales para medios públicos",
            "• <strong>Asesora Min. Cultura, SuperSalud y ADR</strong> (2023-2024) - Consultoría en comunicación institucional",
            "• <strong>Presentadora Noticias Caracol Televisión</strong> (2022-2023) - Presentación de noticias y reportajes especiales",
            "• <strong>Consultora independiente en inclusión social</strong> (2020-2022) - Proyectos de comunicación para la diversidad",
            "• <strong>Investigadora social</strong> (2019-2020) - Estudios sobre género y derechos humanos"
        ],
        document: "HdV_CamilaJimenezSaez_2025.pdf"
    },
    "Lina Paola Delgadillo Murcia": {
        profession: "relaciones",
        initials: "LD",
        gradient: "from-blue-400 to-indigo-500",
        education: "Especialista en Cooperación Internacional, Política y RRII",
        experience: "Experta en proyectos con impacto social",
        phone: "3105997425",
        email: "linadelgadillomurcia@gmail.com",
        profile: "Liderazgo en consolidación de alianzas estratégicas entre entidades públicas, privadas y multilaterales. Gestión eficiente de recursos de cooperación.",
        fullExperience: [
            "• <strong>Supervisora CAR Cundinamarca</strong> (agosto 2024-Actualidad) - Supervisión de proyectos ambientales y de desarrollo sostenible",
            "• <strong>Directora de Proyectos Ecodes Ingeniería</strong> (abril-sept 2023) - Liderazgo en proyectos de ingeniería con impacto social",
            "• <strong>Coordinadora Nacional DCO Ingeniería</strong> (mayo 2022-enero 2023) - Coordinación de proyectos a nivel nacional",
            "• <strong>Consultora en Cooperación Internacional</strong> (2020-2022) - Asesoría en proyectos multilaterales y alianzas estratégicas",
            "• <strong>Analista de Políticas Públicas</strong> (2018-2020) - Análisis y formulación de políticas de desarrollo",
            "• <strong>Coordinadora de Proyectos Sociales</strong> (2016-2018) - Gestión de iniciativas comunitarias y desarrollo local"
        ],
        document: "68b5e3954db49.pdf"
    },
    "Daniela Eusse Molina": {
        profession: "mercadeo",
        initials: "DE",
        gradient: "from-green-400 to-teal-500",
        education: "Especialista en Mercadeo, Profesional en Comercio Exterior",
        experience: "7 años como Directora de Competitividad",
        phone: "320 707 4089",
        email: "danielaeussem@gmail.com",
        profile: "Experiencia en formulación y ejecución de programas y proyectos, liderazgo de equipos y administración de recursos. Destaca por capacidad de negociación y habilidades analíticas.",
        fullExperience: [
            "• <strong>Coordinadora Proyectos Cámara Comercio Medellín</strong> (marzo-dic 2024) - Gestión de proyectos de desarrollo empresarial",
            "• <strong>Directora Competitividad Cámara Oriente Antioqueño</strong> (oct 2017-marzo 2024) - Liderazgo en programas de competitividad regional",
            "• <strong>Coordinadora de Desarrollo Económico</strong> (2015-2017) - Implementación de estrategias de crecimiento económico local",
            "• <strong>Analista de Mercadeo Internacional</strong> (2013-2015) - Análisis de mercados y oportunidades comerciales",
            "• <strong>Consultora en Comercio Exterior</strong> (2011-2013) - Asesoría a empresas en procesos de internacionalización",
            "• <strong>Especialista en Proyectos de Inversión</strong> (2009-2011) - Evaluación y formulación de proyectos de inversión"
        ],
        document: "HojadeVida-DanielaEusseMolina.pdf"
    },
    "Juan Camilo Correa Díaz": {
        profession: "administracion",
        initials: "JC",
        gradient: "from-orange-400 to-red-500",
        education: "Magíster Gerencia Empresas Sociales, Administrador Público",
        experience: "Gestión de proyectos de desarrollo social",
        age: "35 años",
        phone: "3016301095",
        email: "camilocorreadiaz@gmail.com",
        profile: "Especializado en articulación de sectores público, privado y social. Diseño de soluciones innovadoras, identificación de actores clave y generación de sinergias interinstitucionales.",
        fullExperience: [
            "• <strong>Director de Proyectos Promotora Comercio Social</strong> (2022-2025) - Liderazgo en proyectos de desarrollo social y económico",
            "• <strong>Profesor Cátedra Universidad EAFIT</strong> (2016-Actualidad) - Docencia en administración pública y gestión social",
            "• <strong>Analista Corporativo Fundación Éxito</strong> (2014-2022) - Análisis y gestión de programas de responsabilidad social",
            "• <strong>Coordinador de Proyectos Sociales</strong> (2012-2014) - Gestión de iniciativas comunitarias y desarrollo local",
            "• <strong>Consultor en Gestión Pública</strong> (2010-2012) - Asesoría en procesos de modernización del Estado",
            "• <strong>Analista de Políticas Públicas</strong> (2008-2010) - Evaluación y diseño de políticas sociales"
        ],
        document: "DOCUMENTOS JUAN CAMILO CORREA DIAZ.pdf"
    },
    "Susana Botero Rendón": {
        profession: "politica",
        initials: "SB",
        gradient: "from-purple-400 to-pink-500",
        education: "Maestra en Procesos Urbanos y Ambientales, Ciencia Política",
        experience: "Experiencia en sector público y proyectos sociales",
        phone: "3176403031",
        email: "susanabotero95@gmail.com",
        profile: "Profesional en Ciencia Política con maestría en Procesos Urbanos y Ambientales. Conocimientos en análisis de políticas públicas y planificación urbana, liderazgo en proyectos de impacto social.",
        fullExperience: [
            "• <strong>Contratista Secretaría Inclusión Social Medellín</strong> (marzo 2025-Actual) - Implementación de políticas de inclusión social",
            "• <strong>Gerente de Proyecto E-Learning Factory</strong> (enero 2023-marzo 2024) - Gestión de proyectos educativos digitales",
            "• <strong>Contratista Área Metropolitana Valle de Aburrá</strong> (junio-dic 2023) - Proyectos de planificación urbana y ambiental",
            "• <strong>Cofundadora Fundación Regalando Abrazos</strong> (2020-Actual) - Liderazgo en proyectos de impacto social comunitario",
            "• <strong>Analista de Políticas Públicas</strong> (2019-2020) - Investigación en políticas urbanas y ambientales",
            "• <strong>Consultora en Desarrollo Urbano</strong> (2017-2019) - Asesoría en proyectos de planificación territorial",
            "• <strong>Investigadora Junior</strong> (2015-2017) - Estudios sobre procesos urbanos y sostenibilidad"
        ],
        document: "Susana Botero Rendón - HV.pdf"
    },
    "Sandra Emilia Arroyave Sampedro": {
        profession: "comunicacion",
        initials: "SA",
        gradient: "from-cyan-400 to-blue-500",
        education: "Comunicadora Social y Periodista, Especialista en Gerencia de Mercadeo",
        experience: "Amplia experiencia en comunicación corporativa",
        phone: "310 2170064",
        email: "sandraarroyav7@gmail.com",
        profile: "Amplia experiencia en diseño e implementación de estrategias de comunicación y mercadeo, especialmente para entidades sociales y educativas. Experta en Responsabilidad Social Empresarial y consecución de recursos.",
        fullExperience: [
            "• <strong>Docente y consultora independiente</strong> (noviembre 2002-actualidad) - Consultoría en comunicación y RSE para organizaciones sociales",
            "• <strong>Directora Comunicaciones Teletón Colombia</strong> (2009-2011) - Liderazgo en estrategias comunicacionales para recaudación de fondos",
            "• <strong>Coordinadora Publicidad Asoc. Colombiana Porcicultores</strong> (2007) - Gestión de campañas publicitarias sectoriales",
            "• <strong>Jefe de Medios Cámara Industria Colombo-Alemana</strong> (2002-2005) - Coordinación de relaciones con medios y comunicación institucional",
            "• <strong>Coordinadora de Comunicaciones Corporativas</strong> (2000-2002) - Desarrollo de estrategias de comunicación interna y externa",
            "• <strong>Periodista y Productora</strong> (1998-2000) - Producción de contenidos para medios de comunicación",
            "• <strong>Asistente de Comunicaciones</strong> (1996-1998) - Apoyo en gestión de comunicación organizacional"
        ],
        document: "CVSandraEmiliaArroyaveSampedro.pdf"
    },
    "Melissa Zuluaga Soto": {
        profession: "politica",
        initials: "MZ",
        gradient: "from-indigo-400 to-purple-500",
        education: "Politóloga bilingüe, Especialización en Cooperación Internacional",
        experience: "Experta en políticas públicas y proyectos",
        phone: "3174376212",
        email: "amezuluagaso@gmail.com",
        profile: "Politóloga bilingüe experta en análisis de escenarios complejos y diseño de estrategias de impacto social. Habilidades en negociación, construcción de relaciones organizacionales y gestión de stakeholders.",
        fullExperience: [
            "• <strong>Asistente de Proyectos Pearson</strong> (enero 2024-Actualidad) - Apoyo en gestión de proyectos educativos internacionales",
            "• <strong>Consultora en Políticas Públicas</strong> (agosto 2022-diciembre 2023) - Análisis y evaluación de políticas gubernamentales",
            "• <strong>Pasante Dirección General Apoyo Fiscal Min. Hacienda</strong> (enero-julio 2022) - Análisis de políticas fiscales y presupuestarias",
            "• <strong>Investigadora Junior en Cooperación Internacional</strong> (2021-2022) - Estudios sobre programas de cooperación bilateral",
            "• <strong>Analista de Relaciones Internacionales</strong> (2020-2021) - Monitoreo de acuerdos internacionales y multilaterales",
            "• <strong>Asistente de Investigación</strong> (2019-2020) - Apoyo en proyectos de investigación política y social"
        ],
        document: "MelissaZuluaga_CV_2025.pdf"
    },
    "Laura Cristina Henao": {
        profession: "publicidad",
        initials: "LH",
        gradient: "from-rose-400 to-pink-500",
        education: "Especialista en Relaciones Públicas, Profesional en Publicidad",
        experience: "+8 años en comunicación y marketing digital",
        age: "31 años",
        phone: "321 6420271",
        email: "laurahenao124@gmail.com",
        profile: "Publicista y Especialista en Relaciones Públicas con experiencia en gestión de proyectos de comunicación y marketing digital. Capacidad para coordinar equipos y ejecutar campañas efectivas en entornos B2B y B2C.",
        fullExperience: [
            "• <strong>Profesional de Relacionamiento Parque Explora</strong> (sept 2024-Actualidad) - Gestión de alianzas estratégicas y relacionamiento institucional",
            "• <strong>Account Manager QuotaMedia</strong> (abril 2022-agosto 2024) - Gestión de cuentas B2B y desarrollo de estrategias comerciales",
            "• <strong>Project Manager TIF</strong> (agosto 2021-abril 2022) - Coordinación de proyectos de marketing digital y comunicación",
            "• <strong>Coordinadora de Marketing Digital</strong> (2020-2021) - Desarrollo de campañas digitales y gestión de redes sociales",
            "• <strong>Especialista en Comunicación Corporativa</strong> (2018-2020) - Gestión de comunicación interna y externa para empresas",
            "• <strong>Ejecutiva de Cuentas Publicitarias</strong> (2016-2018) - Manejo de portafolio de clientes y desarrollo de propuestas creativas",
            "• <strong>Asistente de Producción Publicitaria</strong> (2014-2016) - Apoyo en producción de campañas y material publicitario"
        ],
        document: "Laura_Cristina_Henao_CV.pdf"
    },
    "Martha Liliana Suárez García": {
        profession: "economia",
        initials: "MS",
        gradient: "from-emerald-400 to-teal-500",
        education: "Magíster en Economía y Política de la Educación, Economista",
        experience: "+10 años en gestión de proyectos estratégicos",
        phone: "3017550721",
        email: "msuarezgarcia3@gmail.com",
        profile: "Profesional con más de 10 años de experiencia en gestión de proyectos estratégicos, enfocada en visión estratégica, eficiencia operativa y soluciones orientadas a resultados. Ha liderado iniciativas innovadoras en análisis de indicadores educativos.",
        fullExperience: [
            "• <strong>Especialista Gestión de Información Secretaría Educación Medellín</strong> (nov 2024-Actual) - Análisis de indicadores educativos y gestión de información estratégica",
            "• <strong>Asesora Programa Teletrabajo Incluyente MinTIC</strong> (marzo 2021-dic 2023) - Liderazgo en adopción del teletrabajo en +250 organizaciones",
            "• <strong>Consultora en Transformación Digital</strong> (2020-2021) - Asesoría en procesos de digitalización organizacional",
            "• <strong>Coordinadora de Proyectos Estratégicos</strong> (2018-2020) - Gestión de iniciativas de modernización institucional",
            "• <strong>Analista de Políticas Educativas</strong> (2016-2018) - Evaluación y seguimiento de políticas públicas educativas",
            "• <strong>Investigadora en Economía de la Educación</strong> (2014-2016) - Estudios sobre financiamiento y eficiencia educativa",
            "• <strong>Economista Junior</strong> (2012-2014) - Análisis económico y estadístico en sector público"
        ],
        document: "CV_Martha_Liliana_Suarez.pdf"
    },
    "Julián Mazo Zapata": {
        profession: "economia",
        initials: "JM",
        gradient: "from-amber-400 to-orange-500",
        education: "Magíster en Economía Aplicada, Politólogo",
        experience: "Head Internacionalización - Inteligencia de mercados",
        phone: "3117125131",
        email: "julianmazoz10@gmail.com",
        profile: "Profesional con capacidades orientadas al logro basadas en coordinación de equipos y aliados. Experiencia en análisis cuantitativo, construcción de indicadores y diseño de programas para acompañamiento empresarial y consultoría estratégica.",
        fullExperience: [
            "• <strong>Head Internacionalización Globalista SAS</strong> (agosto 2023-Actualidad) - Liderazgo en estrategias de internacionalización e inteligencia de mercados",
            "• <strong>Profesor cátedra Universidad EAFIT</strong> (julio 2016-Actualidad) - Docencia en economía aplicada y análisis cuantitativo",
            "• <strong>Líder Competitividad e Internacionalización Proantioquia</strong> (marzo 2019-julio 2023) - Coordinación de programas de competitividad regional",
            "• <strong>Consultor en Desarrollo Económico</strong> (2017-2019) - Asesoría en proyectos de desarrollo territorial y empresarial",
            "• <strong>Analista de Políticas Públicas</strong> (2015-2017) - Evaluación de impacto de políticas económicas y sociales",
            "• <strong>Investigador en Economía Aplicada</strong> (2013-2015) - Estudios econométricos y análisis de mercados",
            "• <strong>Asistente de Investigación</strong> (2011-2013) - Apoyo en proyectos de investigación económica y política"
        ],
        document: "CV-JMZ_20252.pdf"
    },
    "Alejandro Jiménez Salazar": {
        profession: "politica",
        initials: "AJ",
        gradient: "from-violet-400 to-purple-500",
        education: "Politólogo Universidad EAFIT",
        experience: "Experiencia en investigación aplicada y análisis de datos",
        age: "29 años",
        phone: "320 711 2445",
        email: "jimenezsalazaralejandro@gmail.com",
        profile: "Profesional en Ciencia Política con experiencia en investigación aplicada y análisis de datos, con manejo de herramientas como RStudio y Excel. Interesado en proyectos de impacto social, evaluación de políticas públicas y toma de decisiones.",
        fullExperience: [
            "• <strong>Embajador de Estrategia MeLoCreo - Tether Education y Alcaldía Medellín</strong> (agosto 2025-Actual) - Implementación de estrategias educativas innovadoras",
            "• <strong>Analista Metodológico Planeación, Monitoreo y Evaluación - Colegio Mayor de Antioquia</strong> (sept 2022-dic 2023) - Diseño de metodologías de seguimiento y evaluación",
            "• <strong>Asistente de Investigación Universidad EAFIT</strong> (abril-junio 2022) - Apoyo en proyectos de investigación política y social",
            "• <strong>Analista de Datos Junior</strong> (2021-2022) - Procesamiento y análisis de información con herramientas estadísticas",
            "• <strong>Investigador en Formación</strong> (2020-2021) - Estudios sobre políticas públicas y comportamiento electoral",
            "• <strong>Asistente de Cátedra</strong> (2019-2020) - Apoyo docente en materias de ciencia política"
        ],
        document: "cv_alejandrojimenezs_cpa.pdf"
    },
    "Jose David Tovar Ortiz": {
        profession: "politica",
        initials: "JT",
        gradient: "from-teal-400 to-cyan-500",
        education: "Especialista en Análisis de Políticas Públicas, Politólogo",
        experience: "+5 años en diseño e implementación de proyectos sociales",
        phone: "304 552 47 10",
        email: "josedavidtortiz@gmail.com",
        profile: "Politólogo especializado en análisis de políticas públicas y gestión de proyectos sociales. Experiencia en diseño e implementación de programas y proyectos financiados con subvenciones centrados en desarrollo económico, cooperación internacional e iniciativas de paz territorial.",
        fullExperience: [
            "• <strong>Coordinador Alianzas y Proyectos de Cooperación - Fundación Universitaria Konrad Lorenz</strong> (sept 2024-Actual) - Gestión de alianzas estratégicas y proyectos de cooperación internacional",
            "• <strong>Coordinador Senior Grants Acquisition and Management - World Vision Colombia</strong> (nov 2021-sept 2024) - Liderazgo en consecución y gestión de subvenciones internacionales",
            "• <strong>Oficial Regional Gestión de Información - World Vision América Latina y el Caribe</strong> (junio 2020-oct 2021) - Coordinación regional de sistemas de información y monitoreo",
            "• <strong>Especialista en Proyectos de Desarrollo</strong> (2019-2020) - Diseño e implementación de proyectos sociales con enfoque territorial",
            "• <strong>Analista de Políticas Públicas</strong> (2017-2019) - Evaluación y seguimiento de políticas de paz y desarrollo",
            "• <strong>Consultor en Cooperación Internacional</strong> (2015-2017) - Asesoría en proyectos financiados por organismos multilaterales",
            "• <strong>Investigador Junior</strong> (2013-2015) - Estudios sobre conflicto, paz y desarrollo territorial"
        ],
        document: "CV Jose David.pdf"
    },
    "Stefan Quiroga Fajardo": {
        profession: "politica",
        initials: "SQ",
        gradient: "from-slate-400 to-gray-500",
        education: "Magíster en Ciencia Política, Politólogo",
        experience: "Experiencia internacional ONU y Banco Mundial",
        phone: "3103402034",
        email: "stefanq1@gmail.com",
        profile: "Politólogo con maestría en ciencia política, experiencia en movilización de recursos y fortalecimiento de cooperación entre entidades públicas, privadas y organismos internacionales. Consultor especializado en temas políticos, posconflicto y desarrollo sostenible.",
        fullExperience: [
            "• <strong>Operations Officer ONU</strong> (junio 2024-marzo 2025) - Coordinación de operaciones y gestión de programas multilaterales",
            "• <strong>Reporting & Partnerships Specialist UNICEF</strong> (julio 2023-enero 2024) - Gestión de reportes y desarrollo de alianzas estratégicas",
            "• <strong>Consultor Banco Mundial</strong> (enero-junio 2023) - Asesoría en proyectos de desarrollo sostenible y posconflicto",
            "• <strong>Asistente de Investigación ONU</strong> (marzo-septiembre 2022) - Apoyo en investigación sobre paz y seguridad internacional",
            "• <strong>Analista de Políticas Internacionales</strong> (2021-2022) - Análisis de políticas multilaterales y cooperación internacional",
            "• <strong>Investigador en Ciencia Política</strong> (2019-2021) - Estudios sobre democratización y gobernanza",
            "• <strong>Asistente de Cátedra Universitaria</strong> (2018-2019) - Apoyo docente en ciencia política y relaciones internacionales"
        ],
        document: "Stefan Quiroga Fajardo Hoja de Vida Abril 2025.pdf"
    },
    "Juliana Soto Córdoba": {
        profession: "derecho",
        initials: "JS",
        gradient: "from-red-400 to-rose-500",
        education: "Abogada, Especialista en Cultura de Paz y DIH",
        experience: "+10 años en formulación y ejecución de proyectos",
        phone: "320 788-2994",
        email: "julisoto@gmail.com",
        profile: "Abogada especialista en Cultura de Paz y Derechos Humanos, consultora de proyectos sociales con enfoque en atención a población vulnerable y articulación interinstitucional. Experiencia con cooperación internacional y áreas de RSE, ESG y sostenibilidad.",
        fullExperience: [
            "• <strong>Asistente Administrativa Senior julianitasananda</strong> (junio 2024-Actualidad) - Gestión administrativa y coordinación de proyectos sociales",
            "• <strong>Profesional Jurídico Especializado Alcaldía de Cali</strong> (enero 2017-agosto 2024) - Asesoría jurídica en proyectos de desarrollo social y urbano",
            "• <strong>Asesora Concejo Municipal Santiago de Cali</strong> (enero 2017-enero 2023) - Asesoría en formulación de políticas públicas locales",
            "• <strong>Consultora en Derechos Humanos</strong> (2015-2017) - Asesoría a organizaciones sociales en temas de DDHH y DIH",
            "• <strong>Coordinadora de Proyectos Sociales</strong> (2013-2015) - Gestión de proyectos con población vulnerable y víctimas del conflicto",
            "• <strong>Abogada Junior</strong> (2011-2013) - Práctica jurídica en derecho público y administrativo",
            "• <strong>Practicante Jurídica</strong> (2010-2011) - Apoyo en procesos legales y atención a usuarios"
        ],
        document: "68b4fda06876d.pdf"
    },
    "Hernando Sánchez": {
        profession: "economia",
        initials: "HS",
        gradient: "from-lime-400 to-green-500",
        education: "Economista, Maestría en Filosofía (en curso)",
        experience: "Especialista en Gerencia de Proyecto USAID Colombia",
        phone: "3212134954",
        email: "hernandosanchez@hotmail.com",
        profile: "Economista con dominio profesional avanzado de inglés. Sólida experiencia en liderazgo del diseño e implementación de iniciativas de alto impacto en inclusión social, sostenibilidad y cooperación internacional. Experto en gestión de programas financiados por USAID y el sector privado.",
        fullExperience: [
            "• <strong>Especialista en Gerencia de Proyecto USAID Colombia</strong> (abril 2011-julio 2025) - Liderazgo en programas de cooperación internacional y desarrollo sostenible",
            "• <strong>Coordinador proceso integración regional Alcaldía Mayor de Bogotá</strong> (julio 2006-febrero 2011) - Gestión de procesos de integración regional y cooperación territorial",
            "• <strong>Consultor en Desarrollo Económico</strong> (2004-2006) - Asesoría en proyectos de desarrollo económico local y regional",
            "• <strong>Analista Económico Senior</strong> (2002-2004) - Análisis macroeconómico y evaluación de políticas públicas",
            "• <strong>Investigador Económico</strong> (2000-2002) - Estudios sobre desarrollo económico y políticas sociales",
            "• <strong>Economista Junior</strong> (1998-2000) - Análisis económico y estadístico en sector público"
        ],
        document: "CV - SANCHEZ Hernando.pdf"
    },
    "Xenia Paola Arellano Tamayo": {
        profession: "relaciones",
        initials: "XA",
        gradient: "from-sky-400 to-blue-500",
        education: "Profesional en Relaciones Internacionales",
        experience: "Coordinadora de Proyectos Internacionales",
        phone: "305 470 6367",
        email: "xarellanotamayo@gmail.com",
        profile: "Profesional en Relaciones Internacionales con experiencia en cooperación internacional y gestión de alianzas estratégicas. Historial comprobado en articulación de relaciones entre instituciones públicas y privadas, creación y consolidación de redes de colaboración para generar oportunidades de negocio e inversión.",
        fullExperience: [
            "• <strong>Coordinadora de Proyectos Internacionales Paradiplomacia.org</strong> (marzo 2025-Presente) - Gestión de proyectos de cooperación internacional y paradiplomacia",
            "• <strong>Legal Assistant Quiroga Law Office PLLC</strong> (noviembre 2023-julio 2024) - Apoyo legal en casos de inmigración y derecho internacional",
            "• <strong>Consultora en Relaciones Internacionales</strong> (agosto 2022-octubre 2023) - Asesoría en proyectos de cooperación bilateral y multilateral",
            "• <strong>Investigadora Instituto de Desarrollo Político e Institucional Uninorte</strong> (2021-2022) - Investigación en gobernanza y desarrollo institucional",
            "• <strong>Analista de Cooperación Internacional</strong> (2020-2021) - Análisis de programas de cooperación y ayuda al desarrollo",
            "• <strong>Asistente de Relaciones Internacionales</strong> (2019-2020) - Apoyo en gestión de relaciones diplomáticas y comerciales",
            "• <strong>Practicante en Organizaciones Internacionales</strong> (2018-2019) - Experiencia práctica en organismos multilaterales"
        ],
        document: "HdV Xenia Arellano - Coordinador de Alianzas y desarrollo de negocios .pdf"
    },
    "Ximena Alvarez Castro": {
        profession: "finanzas",
        initials: "XC",
        gradient: "from-fuchsia-400 to-purple-500",
        education: "Especialista en Finanzas, Administradora de Empresas",
        experience: "Experiencia en estructuración y evaluación de proyectos",
        phone: "3143613115",
        email: "ximenaalvarezcastro@gmail.com",
        profile: "Administradora de empresas especialista en finanzas con experiencia en elaboración de estudios de mercado, búsqueda de alianzas comerciales y seguimiento financiero y administrativo de proyectos. Conocimientos en elaboración de modelos financieros y creación de planes comerciales para organizaciones comunitarias.",
        fullExperience: [
            "• <strong>Profesional en estudios de Sector ICBF</strong> (febrero-agosto 2025) - Análisis sectorial y evaluación de programas de bienestar familiar",
            "• <strong>Profesional comercial UNODC</strong> (junio-diciembre 2024) - Desarrollo de estrategias comerciales para proyectos de desarrollo alternativo",
            "• <strong>Profesional en Formulación y estructuración de Proyectos ADR</strong> (mayo-dic 2023 y marzo-mayo 2024) - Diseño y estructuración financiera de proyectos de desarrollo rural",
            "• <strong>Consultora en Evaluación Financiera de Proyectos</strong> (2022-2023) - Análisis de viabilidad financiera y estructuración de modelos de negocio",
            "• <strong>Analista Financiera Senior</strong> (2020-2022) - Evaluación de inversiones y análisis de riesgo financiero",
            "• <strong>Coordinadora de Proyectos Comerciales</strong> (2018-2020) - Gestión de iniciativas comerciales y desarrollo de alianzas estratégicas",
            "• <strong>Especialista en Estudios de Mercado</strong> (2016-2018) - Investigación de mercados y análisis de oportunidades comerciales",
            "• <strong>Analista Financiera Junior</strong> (2014-2016) - Análisis financiero y apoyo en estructuración de proyectos"
        ],
        document: "hoja de vida 22.06.2025 (1).docx"
    },
    "Valentina Acosta": {
        profession: "gobierno",
        initials: "VA",
        gradient: "from-pink-400 to-rose-500",
        education: "Profesional en Gobierno y Relaciones Internacionales",
        experience: "+2 años en formulación y evaluación de proyectos",
        phone: "312-548-8037",
        email: "L.valentina2404@hotmail.com",
        profile: "Profesional en Gobierno y Relaciones Internacionales con énfasis en análisis de datos y experiencia en proyectos orientados al desarrollo. Competencias investigativas en economía colombiana, construcción de paz, cooperación internacional, derechos humanos y ODS.",
        fullExperience: [
            "• <strong>Gestora Operativa DANE</strong> (septiembre 2023-mayo 2025) - Coordinación de operaciones estadísticas y análisis de datos socioeconómicos",
            "• <strong>Practicante Monitoreo y Evaluación UNICEF</strong> (julio 2022-enero 2023) - Seguimiento y evaluación de programas de desarrollo infantil y cooperación",
            "• <strong>Consultora Capstone Departamento Nacional de Planeación</strong> (enero-julio 2022) - Análisis de políticas públicas y evaluación de programas gubernamentales",
            "• <strong>Investigadora Junior en Políticas Públicas</strong> (2021-2022) - Estudios sobre implementación de políticas de desarrollo y cooperación internacional",
            "• <strong>Analista de Datos Gubernamentales</strong> (2020-2021) - Procesamiento y análisis de información para toma de decisiones públicas",
            "• <strong>Asistente de Investigación en Relaciones Internacionales</strong> (2019-2020) - Apoyo en estudios sobre cooperación internacional y ODS",
            "• <strong>Practicante en Análisis Político</strong> (2018-2019) - Monitoreo de políticas públicas y análisis de contexto político"
        ],
        document: "CV_Valentina_Ac"
    },
    "Laura Velásquez Hernández": {
        profession: "gestion",
        initials: "LV",
        gradient: "from-indigo-400 to-blue-500",
        education: "Maestra en Gobierno del Territorio, Especialista en Gestión Pública",
        experience: "+4 años en cooperación y desarrollo sostenible",
        phone: "312 5539936",
        email: "lauravelasquezzh@gmail.com",
        profile: "Politóloga bilingüe, especialista en gestión pública y magíster en gobierno del territorio. Experta en análisis de políticas públicas, negociación con actores clave y diseño de estrategias de incidencia política. Se destaca por sus habilidades de comunicación y planificación estratégica territorial.",
        fullExperience: [
            "• <strong>Coordinadora de Cooperación Internacional Gobernación del Quindío</strong> (enero 2022-presente) - Liderazgo en gestión de proyectos de cooperación internacional y desarrollo territorial",
            "• <strong>Consultora en Políticas Territoriales</strong> (2021-2022) - Asesoría en diseño de políticas públicas territoriales y planificación estratégica",
            "• <strong>Analista de Desarrollo Territorial</strong> (2020-2021) - Evaluación de programas de desarrollo local y ordenamiento territorial",
            "• <strong>Practicante Departamento Administrativo de la Función Pública</strong> (enero-mayo 2020) - Apoyo en procesos de modernización del Estado y gestión pública",
            "• <strong>Investigadora en Gobierno del Territorio</strong> (2019-2020) - Estudios sobre gobernanza territorial y participación ciudadana",
            "• <strong>Asistente de Proyectos de Desarrollo Local</strong> (2018-2019) - Apoyo en formulación y seguimiento de proyectos comunitarios",
            "• <strong>Practicante en Gestión Pública</strong> (2017-2018) - Experiencia en administración pública y atención ciudadana"
        ],
        document: "68b1d8a1befbe.pdf"
    },
    "Dina Margarita Linero Ariza": {
        profession: "gerencia",
        initials: "DL",
        gradient: "from-emerald-400 to-green-500",
        education: "Maestra en Gerencia de Proyectos, Especialista en Gestión de Proyectos",
        experience: "Amplia experiencia en gestión y formulación de proyectos",
        phone: "3005483279, 3162415661",
        email: "linerodina@gmail.com",
        profile: "Maestra en Gerencia de Proyectos con experiencia en identificación de oportunidades de financiamiento, formulación de proyectos y coordinación de equipos multidisciplinarios bajo metodologías PMI y Scrum. Habilidades en análisis de datos, planificación estratégica y gestión de proyectos.",
        fullExperience: [
            "• <strong>Consultora Identificación y Presentación de Proyectos PNUD</strong> (junio-sept 2024) - Identificación de oportunidades de financiamiento y formulación de propuestas para organismos multilaterales",
            "• <strong>Coordinadora de Proyectos para Desarrollo Económico y Social RED</strong> (enero-dic 2023) - Gestión integral de proyectos de desarrollo con enfoque en sostenibilidad",
            "• <strong>Asesora Metodológica Dirección Nacional de Gestión de Proyectos Ejército Nacional</strong> (julio-dic 2022) - Implementación de metodologías PMI y mejores prácticas en gestión de proyectos",
            "• <strong>Consultora Senior en Gerencia de Proyectos</strong> (2014-2022) - Asesoría especializada en formulación, evaluación y seguimiento de proyectos",
            "• <strong>Coordinadora de Proyectos Cloudex SAS</strong> (octubre 2010-octubre 2013) - Liderazgo en proyectos tecnológicos y de innovación",
            "• <strong>Gerente de Proyectos</strong> (2008-2010) - Gestión de portafolio de proyectos y coordinación de equipos multidisciplinarios",
            "• <strong>Especialista en Formulación de Proyectos</strong> (2006-2008) - Diseño y estructuración de proyectos de inversión pública y privada",
            "• <strong>Analista de Proyectos Junior</strong> (2004-2006) - Evaluación técnica y financiera de iniciativas de desarrollo"
        ],
        document: "1047420677 Dina Linero Resume.pdf"
    }
};