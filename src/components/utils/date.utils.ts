export const formatDate = (rawDate: string) => {
    if (!rawDate) {
      return 'Invalid date';
    }
  
    const date = new Date(rawDate);
  
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
  
    // Get the month name
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const monthName = months[date.getMonth()];
  
    // Get the day and year
    const day = date.getDate();
    const year = date.getFullYear();
  
    // Construct the formatted date string
    const formattedDate = `${monthName} ${day}, ${year}`;
  
    return formattedDate;
  };
  
  export const formatDateAsYYMMDD = (rawDate: string) => {
    const date = new Date(rawDate);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    const newDateString = `${year}-${month}-${day}`;
    return newDateString;
  };
  
  export const convertTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
  
    // Get hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Format hours and minutes with leading zeros if necessary
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  
    const formattedTime = formattedHours + ':' + formattedMinutes;
  
    return formattedTime;
  };
  
  export const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength) + '...';
    }
  };
   
  // Time utils
  export function formatRelativeDate(inputDate: string) {
    const dateFix = new Date(inputDate);
  
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
  
    const inputYear = dateFix.getFullYear();
    const inputMonth = dateFix.getMonth();
    const inputDay = dateFix.getDate();
  
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();
  
    const tomorrowYear = tomorrow.getFullYear();
    const tomorrowMonth = tomorrow.getMonth();
    const tomorrowDay = tomorrow.getDate();
  
    if (inputYear !== todayYear) {
      // Show year if it's a different year
      return `${inputDay} ${getMonthName(inputMonth)} ${inputYear}`;
    } else if (inputMonth === todayMonth && inputDay === todayDay) {
      // Today
      return `Vandaag ${formatTime(dateFix)}`;
    } else if (inputYear === tomorrowYear && inputMonth === tomorrowMonth && inputDay === tomorrowDay) {
      // Tomorrow
      return `Morgen ${formatTime(dateFix)}`;
    } else {
      // Other dates in the same year
      return `${inputDay} ${getMonthName(inputMonth)} ${formatTime(dateFix)}`;
    }
  }
  
  function getMonthName(monthIndex: number) {
    const months = ['jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
    return months[monthIndex];
  }
  
  function formatTime(date: Date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  
  export const prepareQueryParam = (value: string) => {
    if (!value) return '';
    return value
      .toLowerCase()
      .replace(/\s+/g, '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9-]/g, '');
  };