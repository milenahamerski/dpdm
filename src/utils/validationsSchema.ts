import { z } from "zod";

export const avatarSchema = z.object({
  base64: z
    .string()
    .min(10, "Invalid image selected.")
    .refine((str) => /^[A-Za-z0-9+/=]+$/.test(str), {
      message: "Invalid image format.",
    })
    .refine((str) => (str.length * 3) / 4 < 2 * 1024 * 1024, {
      message: "Image must be smaller than 2MB.",
    }),

  type: z.enum(["image/jpeg", "image/png"], {
    message: "Unsupported image type.",
  }),
});

export const tripSchema = z.object({
  destination: z.string().min(2, "Destination is required."),
  startDate: z.date(),
  endDate: z.date(),
  notes: z.string().optional(),
});
