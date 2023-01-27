export class Regex {
    private static regex: RegExp;
  
    static email(email: string): boolean {
      this.regex = new RegExp(
        /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim,
      );
  
      return this.regex.test(email);
    }
  
    static password(password: string): boolean {
      this.regex = new RegExp(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,25}$/,
      );
  
      return this.regex.test(password);
    }
  }
  