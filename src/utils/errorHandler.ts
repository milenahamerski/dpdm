import { ZodError } from "zod";

/**
 * TRIP ERRORS
 */
export function handleTripError(error: any): string {
  if (error instanceof ZodError) {
    return error.issues[0]?.message || "Invalid trip data.";
  }

  if (error?.message) {
    if (error.message.includes("duplicate")) {
      return "A trip with similar information already exists.";
    }
    if (error.message.includes("invalid input")) {
      return "Some fields contain invalid trip data.";
    }
    return error.message;
  }

  return "Something went wrong while creating the trip.";
}

/**
 * AVATAR ERRORS
 */
export function handleAvatarError(error: any): string {
  if (error instanceof ZodError) {
    return error.issues[0]?.message || "Invalid avatar data.";
  }

  if (error?.message) {
    if (error.message.includes("too large")) {
      return "The image is too large. Please select one under 2MB.";
    }
    if (error.message.includes("unsupported")) {
      return "Unsupported image type. Use JPG or PNG.";
    }
    return error.message;
  }

  return "Failed to update avatar. Try another image.";
}

/**
 * USER ERRORS
 */
export function handleUserError(error: any): string {
  if (error instanceof ZodError) {
    return error.issues[0]?.message || "Invalid user data.";
  }

  if (error?.message) {
    if (error.message.includes("auth")) {
      return "Authentication error. Please try logging in again.";
    }
    if (error.message.includes("duplicate")) {
      return "This email is already registered.";
    }
    return error.message;
  }

  return "Something went wrong with the user operation.";
}

/**
 * GENERIC SUPABASE / NETWORK ERRORS
 */
export function handleSupabaseError(error: any): string {
  if (!error) return "Unknown error.";

  if (error?.message) {
    if (error.message.includes("Failed to fetch")) {
      return "Network error. Check your internet connection.";
    }
    if (error.message.includes("permission denied")) {
      return "You don't have permission to perform this action.";
    }
    return error.message;
  }

  return "Unexpected server error.";
}

/**
 * VERY GENERIC FALLBACK
 */
export function handleGenericError(error: any): string {
  if (error instanceof ZodError) {
    return error.issues[0]?.message || "Invalid data submitted.";
  }

  if (error?.message) return error.message;

  return "Something unexpected happened.";
}
