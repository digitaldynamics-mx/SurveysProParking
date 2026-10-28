export type QuestionType = 'yesno' | 'scale' | 'nps' | 'text';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
}

export interface SurveyDef {
  slug: string;
  type: string;
  tag: string;
  title: string;
  intro: string;
  questions: Question[];
}

export const SURVEYS: Record<string, SurveyDef> = {
  sla_operador: {
    slug: 'sla-operador',
    type: 'sla_operador',
    tag: 'SLA',
    title: 'Nivel de servicio — Operador / contratante',
    intro: 'Evalúa si se cumplieron los acuerdos de nivel de servicio este periodo. Responde Sí o No.',
    questions: [
      { id: 'q1', type: 'yesno', text: '¿La plataforma estuvo disponible al menos el 99.5% del mes?' },
      { id: 'q2', type: 'yesno', text: '¿Se mantuvo la disponibilidad en el horario crítico (18:00–02:00)?' },
      { id: 'q3', type: 'yesno', text: '¿Se respondió toda incidencia crítica (caída total) en 15 minutos o menos?' },
      { id: 'q4', type: 'yesno', text: '¿Se respondió toda incidencia media en 2 horas hábiles o menos?' },
      { id: 'q5', type: 'yesno', text: '¿Se resolvió cada incidencia crítica en 4 horas o menos?' },
      { id: 'q6', type: 'yesno', text: '¿Hubo soporte disponible los 7 días en el horario de operación (noches y fines)?' },
      { id: 'q7', type: 'yesno', text: '¿Las pantallas clave de la app cargaron en 2 segundos o menos?' },
      { id: 'q8', type: 'yesno', text: '¿El QR temporal de entrega se generó en 3 segundos o menos?' },
      { id: 'q9', type: 'yesno', text: '¿Se entregó al menos el 98% de las notificaciones de WhatsApp al cliente?' },
      { id: 'q10', type: 'yesno', text: '¿La operación offline se sincronizó en 60 segundos o menos al recuperar señal?' },
      { id: 'q11', type: 'yesno', text: '¿El respaldo garantizó una pérdida máxima de 24 horas de datos (RPO)?' },
      { id: 'q12', type: 'yesno', text: '¿La recuperación ante desastre se logró en 8 horas o menos (RTO)?' },
      { id: 'q13', type: 'yesno', text: '¿El 100% de los eventos quedó registrado de forma inmutable en la bitácora?' },
      { id: 'q14', type: 'yesno', text: '¿Se parchearon las vulnerabilidades críticas en 72 horas o menos?' },
      { id: 'q15', type: 'yesno', text: '¿Se dio de alta y configuró cada punto nuevo en 5 días hábiles o menos?' },
      { id: 'q16', type: 'yesno', text: '¿Se capacitó al equipo del punto antes del go-live?' },
    ],
  },
  xla_operador: {
    slug: 'xla-operador',
    type: 'xla_operador',
    tag: 'XLA',
    title: 'Experiencia — Operador / contratante',
    intro: 'Cuéntanos cómo ha sido tu experiencia con ProParking como dueño del negocio.',
    questions: [
      { id: 'q1', type: 'scale', text: 'Del 0 al 5, ¿qué tan sencilla fue la puesta en marcha de ProParking en tu negocio?' },
      { id: 'q2', type: 'scale', text: 'Del 0 al 5, ¿qué tan fácil le resultó a tu equipo aprender a usar la app?' },
      { id: 'q3', type: 'scale', text: 'Del 0 al 5, ¿qué tan útil es el panel de administrador para tomar decisiones?' },
      { id: 'q4', type: 'scale', text: 'Del 0 al 5, ¿qué tan satisfecho estás con la rapidez y calidad del soporte?' },
      { id: 'q5', type: 'scale', text: 'Del 0 al 5, ¿qué tanto te ha ayudado ProParking a reducir faltantes y reclamos?' },
      { id: 'q6', type: 'scale', text: 'Del 0 al 5, ¿qué tan justo y claro percibes el modelo de tarifa fija?' },
      { id: 'q7', type: 'scale', text: 'Del 0 al 5, ¿qué tan confiable ha sido la plataforma en tu operación diaria?' },
      { id: 'q8', type: 'scale', text: 'Del 0 al 5, ¿cuánta tranquilidad te da la evidencia y la auditoría ante un reclamo?' },
      { id: 'q9', type: 'scale', text: 'Del 0 al 5, ¿qué tan bien te mantiene informado el equipo de ProParking?' },
      { id: 'q10', type: 'scale', text: 'Del 0 al 5, ¿qué tan satisfecho estás en general con ProParking?' },
      { id: 'nps', type: 'nps', text: '¿Qué tan probable es que recomiendes ProParking a otro dueño de negocio?' },
      { id: 'q11', type: 'scale', text: 'Del 0 al 5, ¿qué tan probable es que renueves tu suscripción?' },
      { id: 'comentario', type: 'text', text: 'En una frase, ¿qué es lo que más valoras y qué mejorarías de ProParking?' },
    ],
  },
  xla_usuario: {
    slug: 'xla-usuario',
    type: 'xla_usuario',
    tag: 'XLA',
    title: 'Experiencia — Usuario final',
    intro: 'Cuéntanos cómo fue tu experiencia dejando tu vehículo en el valet.',
    questions: [
      { id: 'q1', type: 'scale', text: 'Del 0 al 5, ¿qué tan seguro sentiste tu vehículo durante el resguardo?' },
      { id: 'q2', type: 'scale', text: 'Del 0 al 5, ¿qué tan fácil fue pedir tu auto por WhatsApp?' },
      { id: 'nps', type: 'nps', text: '¿Qué tan probable es que recomiendes este lugar por su valet?' },
    ],
  },
};

export function getSurvey(type: string): SurveyDef | undefined {
  return SURVEYS[type];
}

export function getSurveyBySlug(slug: string): SurveyDef | undefined {
  return Object.values(SURVEYS).find((s) => s.slug === slug);
}
