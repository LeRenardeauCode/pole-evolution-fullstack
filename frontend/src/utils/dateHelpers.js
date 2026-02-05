import { format, startOfWeek, endOfWeek, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';


export const groupCoursByDay = (cours) => {
  const grouped = {};
  
  cours.forEach((c) => {
    const jourSemaine = getDay(new Date(c.dateDebut));
    const jour = jourSemaine === 0 ? 7 : jourSemaine; 
    
    if (!grouped[jour]) {
      grouped[jour] = [];
    }
    grouped[jour].push(c);
  });


  Object.keys(grouped).forEach((jour) => {
    grouped[jour].sort((a, b) => new Date(a.dateDebut) - new Date(b.dateDebut));
  });

  return grouped;
};


export const getWeekRange = (date) => {
  return {
    debut: startOfWeek(date, { weekStartsOn: 1, locale: fr }), 
    fin: endOfWeek(date, { weekStartsOn: 1, locale: fr })      
  };
};

export const formatDate = (date, formatStr = 'dd MMMM yyyy') => {
  return format(new Date(date), formatStr, { locale: fr });
};


export const formatTime = (date) => {
  return format(new Date(date), 'HH:mm', { locale: fr });
};
