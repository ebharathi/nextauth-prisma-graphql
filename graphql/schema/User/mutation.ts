import { extendType, nonNull, stringArg } from "nexus";
import * as bcrypt from "bcrypt";


export const UserMutations=extendType({
    type:'Mutation',
    definition(t) {
        t.field('createUser',{
            type:'User',
            args:{
                name:nonNull(stringArg()),
                email:nonNull(stringArg()),
                password:nonNull(stringArg())
            },
            resolve:async(parent,_args,ctx)=>{
                const {name,email,password}=_args;
                // Hash the password before storing it
                const hashedPassword = await bcrypt.hash(password, 10);

                return await ctx.prisma.user.create({
                    data:{
                        email,
                        name,
                        hashedPassword
                    }
                })
            }
        })
    },
})