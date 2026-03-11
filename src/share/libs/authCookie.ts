export interface AuthCookieUser {
  uid?: string;
  login?: string;
  email?: string;
  phone?: string | null;
  firstName?: string;
  lastName?: string;
  surname?: string | null;
  staff?: {
    id?: number;
    organization?: {
      id?: number;
      shortName?: string;
      fullName?: string;
    } | null;
    department?: {
      id?: number;
      shortName?: string;
      fullName?: string;
    } | null;
    position?: {
      id?: number;
      shortName?: string;
      fullName?: string;
    } | null;
    roles?: Array<{
      id?: number;
      name?: string;
      description?: string | null;
    }>;
  } | null;
  [key: string]: unknown;
}

export const emptyAuthCookieUser: AuthCookieUser = {
  uid: "",
  login: "",
  email: "",
  phone: null,
  firstName: "",
  lastName: "",
  surname: null,
  staff: {
    id: 0,
    organization: null,
    department: null,
    position: null,
    roles: [],
  },
};

export function getCookieValue(name: string) {
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  return cookie ? cookie.slice(name.length + 1) : null;
}

export function parseUserCookie(): AuthCookieUser {
  const rawValue = getCookieValue("user");
  if (!rawValue) {
    return emptyAuthCookieUser;
  }

  try {
    return JSON.parse(decodeURIComponent(rawValue)) as AuthCookieUser;
  } catch {
    return emptyAuthCookieUser;
  }
}
