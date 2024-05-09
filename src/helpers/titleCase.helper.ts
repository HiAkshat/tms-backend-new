class TitleCaseHelper {
  public titleCase = (word: string) => {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  } 
}

export default TitleCaseHelper