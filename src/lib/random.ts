export class AleaGen {
	c: number
	s0: number
	s1: number
	s2: number

	constructor(seed: any) {
		if (seed == null) seed = +new Date()

		let n = 0xefc8249d

		// Apply the seeding algorithm from Baagoe.
		this.c = 1
		this.s0 = mash(' ')
		this.s1 = mash(' ')
		this.s2 = mash(' ')
		this.s0 -= mash(seed)
		if (this.s0 < 0) {
			this.s0 += 1
		}
		this.s1 -= mash(seed)
		if (this.s1 < 0) {
			this.s1 += 1
		}
		this.s2 -= mash(seed)
		if (this.s2 < 0) {
			this.s2 += 1
		}

		function mash(data: string) {
			data = String(data)
			for (let i = 0; i < data.length; i++) {
				n += data.charCodeAt(i)
				let h = 0.02519603282416938 * n
				n = h >>> 0
				h -= n
				h *= n
				n = h >>> 0
				h -= n
				n += h * 0x100000000 // 2^32
			}
			return (n >>> 0) * 2.3283064365386963e-10 // 2^-32
		}
	}

	next() {
		let { c, s0, s1, s2 } = this
		let t = 2091639 * s0 + c * 2.3283064365386963e-10 // 2^-32
		this.s0 = s1
		this.s1 = s2
		return (this.s2 = t - (this.c = t | 0))
	}

	copy(f: this, t: this) {
		t.c = f.c
		t.s0 = f.s0
		t.s1 = f.s1
		t.s2 = f.s2
		return t
	}
}

export class MersenneTwister {
	seed: number | undefined
	N = 624
	M = 397
	MATRIX_A = 0x9908b0df /* constant vector a */
	UPPER_MASK = 0x80000000 /* most significant w-r bits */
	LOWER_MASK = 0x7fffffff /* least significant r bits */
	mt = new Array(this.N) /* the array for the state vector */
	mti = this.N + 1 /* mti==N + 1 means mt[N] is not initialized */

	constructor(seed: number) {
		if (seed === undefined) this.seed = Math.floor(Math.random() * Math.pow(10, 13))

		this.init_genrand(seed)
	}

	/* initializes mt[N] with a seed */
	init_genrand(s: number) {
		this.mt[0] = s >>> 0

		for (this.mti = 1; this.mti < this.N; this.mti++) {
			s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30)
			this.mt[this.mti] =
				((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253 + this.mti
			/* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
			/* In the previous versions, MSBs of the seed affect   */
			/* only MSBs of the array mt[].                        */
			/* 2002/01/09 modified by Makoto Matsumoto             */
			this.mt[this.mti] >>>= 0
			/* for >32 bit machines */
		}
	}

	/* initialize by an array with array-length */
	/* init_key is the array for initializing keys */
	/* key_length is its length */
	/* slight change for C++, 2004/2/26 */
	init_by_array(init_key: any, key_length: any) {
		var i = 1,
			j = 0,
			k,
			s
		this.init_genrand(19650218)
		k = this.N > key_length ? this.N : key_length
		for (; k; k--) {
			s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)
			this.mt[i] =
				(this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + (s & 0x0000ffff) * 1664525)) +
				init_key[j] +
				j /* non linear */
			this.mt[i] >>>= 0 /* for WORDSIZE > 32 machines */
			i++
			j++
			if (i >= this.N) {
				this.mt[0] = this.mt[this.N - 1]
				i = 1
			}
			if (j >= key_length) {
				j = 0
			}
		}
		for (k = this.N - 1; k; k--) {
			s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)
			this.mt[i] =
				(this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941)) -
				i /* non linear */
			this.mt[i] >>>= 0 /* for WORDSIZE > 32 machines */
			i++
			if (i >= this.N) {
				this.mt[0] = this.mt[this.N - 1]
				i = 1
			}
		}

		this.mt[0] = 0x80000000 /* MSB is 1; assuring non-zero initial array */
	}

	/* generates a random number on [0,0xffffffff]-interval */
	genrand_int32() {
		var y
		var mag01 = new Array(0x0, this.MATRIX_A)
		/* mag01[x] = x * MATRIX_A  for x=0,1 */

		if (this.mti >= this.N) {
			/* generate N words at one time */
			var kk

			if (this.mti === this.N + 1) {
				/* if init_genrand() has not been called, */
				this.init_genrand(5489) /* a default initial seed is used */
			}
			for (kk = 0; kk < this.N - this.M; kk++) {
				y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK)
				this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1]
			}
			for (; kk < this.N - 1; kk++) {
				y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK)
				this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1]
			}
			y = (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK)
			this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1]

			this.mti = 0
		}

		y = this.mt[this.mti++]

		/* Tempering */
		y ^= y >>> 11
		y ^= (y << 7) & 0x9d2c5680
		y ^= (y << 15) & 0xefc60000
		y ^= y >>> 18

		return y >>> 0
	}

	/* generates a random number on [0,0x7fffffff]-interval */
	genrand_int31() {
		return this.genrand_int32() >>> 1
	}

	/* generates a random number on [0,1]-real-interval */
	genrand_real1() {
		return this.genrand_int32() * (1.0 / 4294967295.0)
		/* divided by 2^32-1 */
	}

	/* generates a random number on [0,1)-real-interval */
	random() {
		return this.genrand_int32() * (1.0 / 4294967296.0)
		/* divided by 2^32 */
	}

	/* generates a random number on (0,1)-real-interval */
	genrand_real3() {
		return (this.genrand_int32() + 0.5) * (1.0 / 4294967296.0)
		/* divided by 2^32 */
	}

	/* generates a random number on [0,1) with 53-bit resolution*/
	genrand_res53() {
		var a = this.genrand_int32() >>> 5,
			b = this.genrand_int32() >>> 6
		return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0)
	}
}

type Range = { min: number; max: number }

const minMax = ({ random, min, max }: Range & { random: number }) => {
	return Math.floor(random * (max - min + 1) + min)
}

export const randomFromVal = ({ value, min, max }: Range & { value?: string }) => {
	const prepareSeed = new AleaGen(value)
	const seedOutput = prepareSeed.s1 * 10000000

	const mersenne = new MersenneTwister(seedOutput)

	return minMax({ random: mersenne.random(), min, max })
}
