import type {
  SeekerProfile,
  SeekerProfileInput,
} from "@/domain/seeker-profile";
import type { SeekerProfileRepository } from "../seeker-profile-repository";
import { getMockStore } from "./store";

/**
 * Implementasi SeekerProfileRepository dengan store in-memory (mode demo).
 */
export class MockSeekerProfileRepository
  implements SeekerProfileRepository
{
  async getByUserId(userId: string): Promise<SeekerProfile | null> {
    return getMockStore().seekerProfiles.get(userId) ?? null;
  }

  async upsert(
    userId: string,
    input: SeekerProfileInput
  ): Promise<SeekerProfile> {
    const store = getMockStore();
    const previous = store.seekerProfiles.get(userId);
    const profile: SeekerProfile = {
      userId,
      fullName: input.fullName,
      headline: input.headline,
      bio: input.bio,
      location: input.location,
      phone: input.phone,
      cvUrl: previous?.cvUrl,
    };
    store.seekerProfiles.set(userId, profile);
    return profile;
  }
}
