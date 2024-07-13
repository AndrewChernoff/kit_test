type OptionsType = {
    [el: string]: string
}

export const convertDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: OptionsType = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric', 
      minute: 'numeric',
      second: 'numeric',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    const formattedTime = date.toLocaleString('en-EN', options);
    return formattedTime; 
}
