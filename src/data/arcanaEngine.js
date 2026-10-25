import { classesForCollege } from './colleges'
import { PROFESSORS, getAllThreads } from './figmaData'

const STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'am',
  'do', 'does', 'did', 'doing', 'have', 'has', 'had', 'having',
  'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'she', 'it', 'they', 'them',
  'this', 'that', 'these', 'those', 'there', 'here',
  'and', 'or', 'but', 'if', 'then', 'so', 'because', 'as', 'of', 'to', 'in', 'on',
  'at', 'by', 'for', 'with', 'about', 'into', 'from', 'up', 'out', 'can', 'could',
  'should', 'would', 'will', 'just', 'not', 'no', 'yes', 'how', 'what', 'why',
  'when', 'where', 'who', 'which', 'any', 'anyone', 'someone', 'please', 'help',
  'need', 'want', 'get', 'got', 'know', 'like', 'some', 'more', 'also', 'really',
  'very', 'much', 'thing', 'things', 'way', 'work', 'works', 'stuck', 'trying',
  'try', 'confused', 'understand', 'understanding', 'question', 'problem',
])

const SYNONYMS = {
  calc: 'calculus',
  antiderivative: 'integral',
  antiderivatives: 'integral',
  integrate: 'integral',
  integrating: 'integral',
  integration: 'integral',
  integrals: 'integral',
  differentiate: 'derivative',
  differentiating: 'derivative',
  differentiation: 'derivative',
  derivatives: 'derivative',
  slope: 'derivative',
  limits: 'limit',
  ladder: 'rates',
  rate: 'rates',
  velocity: 'rates',
  speed: 'rates',
  related: 'rates',
  series: 'series',
  sequence: 'series',
  convergence: 'series',
  photosynthesis: 'photosynthesis',
  calvin: 'photosynthesis',
  chloroplast: 'photosynthesis',
  enzyme: 'biology',
  enzymes: 'biology',
  cell: 'biology',
  cells: 'biology',
  genetics: 'biology',
  evolution: 'biology',
  organic: 'organic',
  sn1: 'organic',
  sn2: 'organic',
  titration: 'chemistry',
  equilibrium: 'chemistry',
  acid: 'chemistry',
  moles: 'chemistry',
  recursion: 'recursion',
  recursive: 'recursion',
  stack: 'stack',
  overflow: 'stack',
  binary: 'search',
  tree: 'tree',
  matrix: 'linear',
  matrices: 'linear',
  vectors: 'vector',
  probability: 'probability',
  stats: 'statistics',
  statistics: 'statistics',
  essay: 'writing',
  thesis: 'writing',
  composition: 'writing',
  midterm: 'exam',
  final: 'exam',
  finals: 'exam',
  tutor: 'tutor',
  tutoring: 'tutor',
  homework: 'homework',
  code: 'programming',
  coding: 'programming',
  program: 'programming',
  programming: 'programming',
}

const CLASS_KEYWORDS = {
  'MATH 1151': ['integral', 'derivative', 'limit', 'rates', 'ladder', 'calculus', 'continuous'],
  'MATH 1152': ['series', 'sequence', 'integral', 'rates', 'ladder', 'convergence'],
  'MATH 2153': ['vector', 'partial', 'multivariable', 'surface'],
  'MATH 2162': ['linear', 'matrix', 'basis', 'eigen'],
  'MATH 2182H': ['honors', 'series', 'integral'],
  'MATH 2255': ['differential', 'equation', 'laplace'],
  'MATH 3345': ['proof', 'logic', 'set'],
  'PHYSICS 1250': ['velocity', 'force', 'newton', 'kinematics', 'momentum', 'mechanics'],
  'PHYSICS 1251': ['electric', 'magnetic', 'circuit', 'optics', 'charge'],
  'PHYSICS 2300': ['quantum', 'relativity', 'modern', 'photon'],
  'CHEM 1210': ['chemistry', 'stoichiometry', 'mole', 'reaction'],
  'CHEM 1220': ['chemistry', 'equilibrium', 'acid', 'base', 'titration', 'solubility'],
  'CHEM 2210': ['organic', 'alkane', 'reaction', 'mechanism'],
  'CHEM 2310': ['organic', 'synthesis', 'aromatic'],
  'BIOLOGY 1113': ['photosynthesis', 'cell', 'energy', 'respiration', 'enzyme'],
  'BIOLOGY 1114': ['anatomy', 'organ', 'genetics', 'evolution'],
  'BIOLOGY 2100': ['genetics', 'allele', 'dna', 'inheritance'],
  'CSE 1222': ['programming', 'loop', 'variable', 'python'],
  'CSE 1223': ['programming', 'java', 'class', 'object'],
  'CSE 2221': ['software', 'component', 'interface'],
  'CSE 2331': ['recursion', 'search', 'tree', 'stack', 'algorithm', 'complexity'],
  'CSE 2421': ['assembly', 'memory', 'processor', 'cache'],
  'STAT 1450': ['statistics', 'probability', 'distribution', 'hypothesis'],
  'STAT 3201': ['probability', 'random', 'distribution', 'expectation'],
  'ECON 2001': ['supply', 'demand', 'market', 'microeconomics'],
  'ECON 2002': ['inflation', 'gdp', 'macroeconomics', 'policy'],
  'ENGLISH 1110': ['essay', 'writing', 'composition', 'thesis'],
  'PSYCH 1100': ['psychology', 'behavior', 'memory', 'cognition'],
}

const ROLE_BONUS = { professor: 2.6, grad: 1.9, student: 1 }

export function stem(word) {
  let w = word
  if (w.length > 4 && w.endsWith('ies')) return w.slice(0, -3) + 'y'
  if (w.length > 5 && w.endsWith('ing')) {
    w = w.slice(0, -3)
    return w
  }
  if (w.length > 4 && w.endsWith('ed')) return w.slice(0, -2)
  if (w.length > 4 && w.endsWith('es')) return w.slice(0, -2)
  if (w.length > 3 && w.endsWith('s')) return w.slice(0, -1)
  return w
}

export function tokenize(text) {
  const raw = (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)

  const out = []
  raw.forEach(function (word) {
    if (STOPWORDS.has(word)) return
    if (word.length < 2) return
    const mapped = SYNONYMS[word] || SYNONYMS[stem(word)] || stem(word)
    if (!mapped || STOPWORDS.has(mapped)) return
    if (out.indexOf(mapped) === -1) out.push(mapped)
  })
  return out
}

function buildIdf(docs) {
  const df = {}
  docs.forEach(function (tokens) {
    const seen = {}
    tokens.forEach(function (t) {
      if (seen[t]) return
      seen[t] = true
      df[t] = (df[t] || 0) + 1
    })
  })
  const total = docs.length || 1
  const idf = {}
  Object.keys(df).forEach(function (t) {
    idf[t] = Math.log(1 + total / df[t])
  })
  return idf
}

function overlapScore(tokens, targetTokens, idf) {
  if (!tokens.length || !targetTokens.length) return 0
  const target = {}
  targetTokens.forEach(function (t) {
    target[t] = (target[t] || 0) + 1
  })
  let score = 0
  const matched = []
  tokens.forEach(function (t) {
    if (target[t]) {
      score += (idf[t] || 1) * (1 + Math.min(target[t], 3) * 0.15)
      matched.push(t)
    }
  })
  return { score: score, matched: matched }
}

function classScore(cls, tokens, idf) {
  const blob = tokenize(cls.code + ' ' + cls.title + ' ' + cls.dept)
  const base = overlapScore(tokens, blob, idf)

  let keywordHits = 0
  const keywords = CLASS_KEYWORDS[cls.code] || []
  keywords.forEach(function (k) {
    if (tokens.indexOf(k) !== -1) keywordHits += 1
  })

  const codeTokens = tokenize(cls.code)
  let codeHit = 0
  codeTokens.forEach(function (t) {
    if (tokens.indexOf(t) !== -1) codeHit += 1
  })

  return base.score + keywordHits * 2.4 + codeHit * 3.2
}

function synthesizeAnswer(tokens, threads, idf) {
  const candidates = []

  threads.forEach(function (t) {
    t.posts.forEach(function (post) {
      const sentences = ((post.body || '').match(/[^.!?]+[.!?]?/g) || [])
        .map(function (s) {
          return s.trim()
        })
        .filter(function (s) {
          return s.length > 24
        })

      sentences.forEach(function (sentence) {
        const st = tokenize(sentence)
        const rel = overlapScore(tokens, st, idf)
        if (rel.score === 0) return
        const lengthPenalty = sentence.length > 260 ? 0.75 : 1
        const score =
          (rel.score * (ROLE_BONUS[post.role] || 1) +
            (post.hearts || 0) * 0.14 +
            (t.relevance || 0)) *
          lengthPenalty
        candidates.push({
          sentence: sentence,
          score: score,
          author: post.author,
          role: post.role,
          hearts: post.hearts,
          threadId: t.id,
          threadTitle: t.question,
          classCode: t.classCode,
        })
      })
    })
  })

  candidates.sort(function (a, b) {
    return b.score - a.score
  })

  const picked = []
  const usedThreads = {}
  for (let i = 0; i < candidates.length && picked.length < 2; i++) {
    const c = candidates[i]
    if (usedThreads[c.threadId]) continue
    usedThreads[c.threadId] = true
    picked.push(c)
  }

  if (picked.length === 0) return null

  return {
    text: picked
      .map(function (p) {
        return p.sentence
      })
      .join(' '),
    citations: picked.map(function (p) {
      return {
        author: p.author,
        role: p.role,
        hearts: p.hearts,
        threadId: p.threadId,
        threadTitle: p.threadTitle,
        classCode: p.classCode,
      }
    }),
  }
}

export function analyze(input) {
  const prompt = (input && input.prompt) || ''
  const classCode = (input && input.classCode) || ''
  const collegeId = (input && input.collegeId) || 'osu'

  const pool = classesForCollege(collegeId)
  const tokens = tokenize(prompt)
  const threadsSource = getAllThreads()

  const threadDocs = threadsSource.map(function (t) {
    const replyTokens = []
    t.posts.forEach(function (p) {
      tokenize(p.body).forEach(function (tok) {
        if (replyTokens.indexOf(tok) === -1) replyTokens.push(tok)
      })
    })
    return tokenize(t.question).concat(replyTokens)
  })
  const idf = buildIdf(threadDocs)

  const threadClassBoost = {}
  threadsSource.forEach(function (t) {
    const q = overlapScore(tokens, tokenize(t.question), idf)
    const replyTokens = []
    t.posts.forEach(function (p) {
      tokenize(p.body).forEach(function (tok) {
        if (replyTokens.indexOf(tok) === -1) replyTokens.push(tok)
      })
    })
    const r = overlapScore(tokens, replyTokens, idf)
    const add = q.score * 1.7 + r.score * 0.9
    if (add > 0) threadClassBoost[t.classCode] = (threadClassBoost[t.classCode] || 0) + add
  })

  let cls = null
  let confidence = 0
  let options = []
  let noSignal = false

  if (classCode) {
    cls =
      pool.find(function (c) {
        return c.code === classCode
      }) || null
    confidence = cls ? 1 : 0
  }

  if (!cls) {
    const ranked = pool
      .map(function (c) {
        return {
          cls: c,
          score: classScore(c, tokens, idf) + (threadClassBoost[c.code] || 0),
        }
      })
      .sort(function (a, b) {
        return b.score - a.score
      })

    const top = ranked[0]
    const second = ranked[1]
    cls = top && top.score > 0 ? top.cls : null

    if (cls) {
      const margin = top.score - (second ? second.score : 0)
      confidence = Math.max(
        0.2,
        Math.min(0.97, 0.34 + Math.min(top.score, 8) * 0.055 + margin * 0.06),
      )
    } else {
      cls = pool.find(function (c) {
        return c.code === 'MATH 1151'
      }) || pool[0]
      confidence = 0.18
      noSignal = true
    }

    options = ranked
      .filter(function (r) {
        return r.score > 0
      })
      .slice(0, 3)
      .map(function (r) {
        return { code: r.cls.code, title: r.cls.title, score: r.score }
      })
  }

  const intentText = prompt.toLowerCase()
  let intent = 'answer'
  if (/(tutor|tutoring|study group|study with|who can help)/.test(intentText)) intent = 'tutor'
  else if (/(who teaches|which professor|professor for|office hours)/.test(intentText)) intent = 'professor'
  else if (/(similar|already asked|other people|threads?)/.test(intentText)) intent = 'threads'

  const threads = threadsSource.map(function (t) {
    const questionTokens = tokenize(t.question)
    const replyTokens = []
    t.posts.forEach(function (p) {
      tokenize(p.body).forEach(function (tok) {
        if (replyTokens.indexOf(tok) === -1) replyTokens.push(tok)
      })
    })

    const q = overlapScore(tokens, questionTokens, idf)
    const r = overlapScore(tokens, replyTokens, idf)
    const matched = q.matched.slice()
    r.matched.forEach(function (m) {
      if (matched.indexOf(m) === -1) matched.push(m)
    })

    let score = q.score * 3 + r.score
    if (t.classCode === cls.code) score += 6
    const hasProf = t.posts.some(function (p) {
      return p.role === 'professor'
    })
    if (hasProf) score += 1.5
    if (t.classTitle === cls.title) score += 1

    return Object.assign({}, t, {
      relevance: score > 0 ? score / (score + 5) : 0,
      matchedTerms: matched,
      rawScore: score,
    })
  })
    .sort(function (a, b) {
      return b.rawScore - a.rawScore
    })
    .filter(function (t) {
      return t.rawScore > 0
    })

  const professors = PROFESSORS.map(function (p) {
    const reasons = []
    let score = 0

    if (p.classes.indexOf(cls.code) !== -1) {
      score += 10
      reasons.push('teaches ' + cls.code)
    } else if (p.dept === cls.dept) {
      score += 4
      reasons.push(cls.dept + ' faculty')
    }

    score += Math.min(p.helped / 100, 3.2)
    if (p.online) {
      score += 1.4
      reasons.push('online now')
    }

    const profTokens = tokenize(p.name + ' ' + p.dept + ' ' + p.classes.join(' '))
    const rel = overlapScore(tokens, profTokens, idf)
    score += rel.score * 0.6

    reasons.push('helped ' + p.helped + ' students')

    return Object.assign({}, p, { score: score, reasons: reasons })
  })
    .filter(function (p) {
      return p.score > 4
    })
    .sort(function (a, b) {
      return b.score - a.score
    })
    .slice(0, 3)

  const answer = synthesizeAnswer(tokens, threads.slice(0, 4), idf)

  const needsClarification = !classCode && confidence < 0.5 && options.length > 1

  return {
    prompt: prompt,
    tokens: tokens,
    intent: intent,
    cls: cls,
    confidence: confidence,
    noSignal: noSignal,
    needsClarification: needsClarification,
    options: options,
    professors: professors,
    threads: threads.slice(0, 4),
    answer: answer,
  }
}
