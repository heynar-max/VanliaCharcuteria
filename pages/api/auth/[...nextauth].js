import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from 'next-auth/providers/credentials';


export const authOptions = {
  // Configure one or more authentication providers
    providers: [
        Credentials({
            name: 'Custom Login',
            credentials: {
                email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com'  },
                password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña'  },
            },
            async authorize(credentials) {
                console.log({credentials})
                return { name: 'Juan', correo: 'juan@google.com', role: 'admin' };
    
                // return await dbUsers.checkUserEmailPassword( credentials.email, credentials.password );
    
            }

        }),
        GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        // ...add more providers here
    ],


    callbacks: {

        
    }
}
export default NextAuth(authOptions)