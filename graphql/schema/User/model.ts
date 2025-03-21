import { enumType, objectType } from "nexus"
import * as np from "nexus-prisma";

export const RoleEnum=enumType(np.Role);

export const User = objectType({
  name:np.User.$name,
  definition(t) {
    t.field(np.User.id)
    t.field(np.User.email)
    t.field(np.User.name)
    t.field(np.User.role)
    t.field(np.User.avatar)
    t.field(np.User.createdAt)
  },
})
