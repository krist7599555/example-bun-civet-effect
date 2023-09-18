import * as Effect from '@effect/io/Effect';
import { pipe } from '@effect/data/Function'

const data1 = console.log(((it) => it)(await pipe(
  Effect.succeed(13 as const),
  Effect.map((it) => it * 13),
  Effect.map($ => $.toString()),
  Effect.runPromise
)))


const data2 = await pipe(
  Effect.succeed(13),
  Effect.map($1 => $1 * 13),
  Effect.map($2 => $2 * 13),
  Effect.map($3 => $3.toString()),
  Effect.map((it) => [it, it, 'key', 13] as const),
  Effect.runPromise
)
console.log(data2)

let prisma = {
  authSession: {
    findUnique: (arg: any) => Promise.resolve({
      user: { name: 'krisy' },
      session: '',
      expired_at: new Date(),
    }),
  },
}
const logger = console
// ^?
const miniUserMask = {}
// ^?

function getSession(event: any) {
  if (!prisma) {
    logger.info('create PrismaClient');
    prisma = (new Error(JSON.stringify({
      datasources: {
        db: {
          url: 'url',
        },
      },
    }))
    ) as any
  }

  const o = ((it) => Effect.flatMap(it, Effect.succeed))(Effect.fromNullable(event?.cookies?.get?.('session') as string | undefined)).pipe(
      Effect.flatMap((session) => Effect.tryPromise({
        catch: () => new Error("promise fail") as Error & { brand: "NOTFOUND" },
        try: () => prisma.authSession.findUnique({
            where: {
              session: session,
            },
            select: {
              user: {
                select: miniUserMask,
              },
              expired_at: true,
              session: true,
            },
        }),
      })), 
      Effect.filterOrFail(
        $4 => $4.expired_at < new Date(),
        () => "EXPIRE" as const,),
      Effect.match({
        onFailure: (fail) => {
          return ({prisma: 9,
          auth: undefined,
          authSession: undefined,
          reason: fail})
        },
        onSuccess: (ok) => {
          return ({prisma: 9,
          auth: ok.user,
          authSession: ok.session,
          reason: undefined})
        },
      }),);return o
}


const data3 = await ((it) => it)(Effect.runPromise(Effect.succeed({
  cookies: {
    get: () => "NO VALUE",
  },
}).pipe(Effect.flatMap((it) => getSession(it)))))



const emap = Effect.map;

const { succeed } = Effect
const m = ((s) => emap(s, (it) => ({ value: it })))(((s) => emap(s, (it) => ({ value: it })))(((s) => emap(s, (it) => ({ value: it })))(emap((emap((
  pipe(
  pipe(
  pipe(pipe(13, ($5 => $5+1)), ($6 => $6.toString())), (succeed)), $7 => 
  emap(
  emap(
  pipe(emap($7, ((it) => ['name', it.toUpperCase()] as const)), emap((it) => ({ value: it }))), ((it) => ({ value: it }))), ((it) => ({ value: it }))))), ((it) => ({ value: it })))), ((it) => ({ value: it }))))))

console.log(data1, data2, data3)