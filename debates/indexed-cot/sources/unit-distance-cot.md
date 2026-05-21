# Rewritten Chain of Thought for the Solution to the Unit Distance Problem

Source: OpenAI, https://cdn.openai.com/pdf/1625eff6-5ac1-40d8-b1db-5d5cf925de8b/unit-distance-cot.pdf
Linked from: https://openai.com/index/model-disproves-discrete-geometry-conjecture/

> Extracted from PDF via pdftotext. Mathematical notation may be imperfectly rendered.

---

 Rewritten Chain of Thought for the Solution to the Unit Distance
                           Problem


                                                      Abstract
         This document contains a rewritten summary of the chain of thought for the original AI disproof of
      the unit distance conjecture, in PDF form.


Rewritten Chain of Thought
Erdős’s lattice construction gives something like
                                                 
                                          log n
                                n exp c             = n1+c/ log log n+o(1/ log log n)
                                        log log n

for a fixed constant c > 0. The proposed upper bound should be compared with that sharper scale, not just
with the softer n1+o(1) formulation.
    A loophole, if there is one, would have to lie in the quantifiers or in the formulation. The assertion
is: there exist fixed C, N such that for every suﬀiciently large n, ν(n) ≤ n1+C/ log log n . The negative
assertion is much stronger than the known lower bound: it would require that for every C one can beat
n1+C/ log log n somewhere arbitrarily far out. The standard lattice construction only gives one fixed constant
in the numerator, not arbitrarily large constants.
    Also the O(n4/3 ) bound does not imply this. For a fixed C, the exponent 1 + C/ log log n tends to 1, so
eventually it is below 4/3. There is no trick of choosing C so large that C/ log log n ≥ 1/3 forever; that fails
as n → ∞.
                               √ scale straight. Take an m × m integer grid, so n = m , and count pairs at
                                                                                         2
    The lower
          √      bound keeps the
distance k, then scale by 1/ k. If
                                                       Yt
                                                   k=     pi
                                                             i=1

with the pi ≡ 1 (mod 4), then
                                                    r2 (k) = 4 · 2t
for squarefree k, and more generally                         Y
                                                r2 (k) = 4           (ai + 1)
                                                                 i
             Q ai                                                                                  √
when k =       pi with all relevant primes 1 mod 4. The radius has to fit in the grid, say k ≲ m, so
log k ≲ 2 log m = log n. If k is the product of the first t primes 1 mod 4, then log k ∼ t log t. Thus

                                                           log n
                                                    t∼             .
                                                         log log n

The degree contributed by those directions is about 2t , i.e.
                                                        
                                                 log n
                           exp (log 2 + o(1))              = n(log 2+o(1))/ log log n .
                                               log log n



                                                             1
So the edge count is n times that, up to boundary and factor 1/2. The important point is that the constant
is fixed, essentially log 2 in this normalization. Optimizing the divisor function does not make the constant
arbitrarily large; it gives the usual maximal-order constant.
     Could disjoint unions or padding amplify that constant? If I take k separated copies of an m-point
configuration, I get n = km and edges ke(m). The average degree is the same as for the m-point piece, while
the denominator in the exponent is now governed by n. This dilutes rather than amplifies. Padding with
isolated points is the same kind of loss. So that does not give the negative resolution.
     Maybe there is a trivial graph-theoretic obstruction strong enough for the aﬀirmative? Unit-distance
graphs have constraints: two points in the plane have at most two common unit neighbors, so the graph is
K2,3 -free, which gives only a Kővári–Sós–Turán type O(n3/2 ). The crossing lemma, using that all edges are
unit segments and that adjacent edges do not cross, gives the classical O(n4/3 ). But pushing this all the way
to near-linear is the hard part. Incidence bounds for unit circles give the same kind of n4/3 scale; the centers
being the same as the points is the special symmetry one wants to exploit, and I do not know a theorem
that does it.
     Maybe the exact sharpened statement has been resolved by some modern incidence theorem? The
semi-algebraic graph results of Fox–Pach–Sheffer–Suk–Zahl come to mind: for point-circle incidences, or for
Ku,u -free semi-algebraic bipartite graphs in fixed dimensions, one gets Zarankiewicz-type exponents. For
the unit-distance relation in R2 × R2 , the natural forbidden K2,3 still leads to exponents like 4/3 or 3/2, not
1 + o(1). Polynomial partitioning by itself does not magically distinguish congruent circles with centers in
the point set enough to prove Erdős.
     A negative construction outside the classical lattice would have to use the freedom of arbitrary real
coordinates. Perhaps there are configurations with many more unit distances. The obvious high-dimensional
encoding is worth testing.
     Take d unit vectors u1 , . . . , ud in the plane, chosen generically so that all subset sums are distinct. Let
                                                  (                            )
                                                    X
                                             P =        ui : S ⊆ {1, . . . , d} .
                                               i∈S

Then |P | = 2d , and whenever two subsets differ in one coordinate the two points differ by ui , hence are at
distance 1. This gives the hypercube graph:
                                                              1
                                             e = d2d−1 ∼        n log2 n.
                                                              2
More generally, with coeﬀicients 0, . . . , L − 1, a generalized arithmetic progression in d unit directions has

                                               n = Ld ,        e ∼ dn

up to boundary. Maximizing d = log n/ log L by taking L = 2 gives n log n. This is cute, but much weaker
than the lattice lower bound, because

                                         log n  exp(c log n/ log log n).

    Can I combine the hypercube idea with the lattice idea? If I have many unit directions and build a
progression in all of them, the dimension explodes and the number of vertices becomes exponential in the
number of directions. The integer lattice is better because all those many directions live in a rank-two
additive group after scaling. So the real issue is: can many unit vectors live in a low-rank additive group,
with small coeﬀicient complexity?
    Roots of unity are a natural test. The m-th roots of unity are all unit vectors and lie in the cyclotomic
field. Additively they span rank ϕ(m) over Z. If I take a coeﬀicient box of side L in a basis, I have roughly

                                                     n ∼ Lϕ(m)

points, and I have ∼ m unit directions available. But m/ϕ(m) is at most of order log log m. With L = 2,
log n ∼ ϕ(m), so the degree coming from all roots of unity is at best something like log n log log log n, not the
exponential-in-log n/ log log n lattice degree. So roots of unity do not beat the Gaussian divisor construction.


                                                          2
   What about taking powers of a single rational point on the unit circle, say
                                                       3 + 4i
                                                  α=          .
                                                         5
All powers αj are unit vectors. At first glance that gives many directions in a rank-two rational vector space.
But after clearing denominators up to 5m , these are just Gaussian integer vectors of length 5m :

                                                    (3 + 4i)j 5m−j
                                             αj =                  .
                                                          5m
The number of unit vectors in (1/5m )Z[i] is governed by representations of 52m as a sum of two squares,
namely 4(2m + 1). So powers of one rational unit-circle point are exactly the divisor-function picture, and
only linear in m for one prime.
    Maybe higher-degree algebraic numbers help. Suppose α is an algebraic integer with one chosen complex
embedding satisfying |σ0 (α)| = 1, but α is not a root of unity. Then the powers σ0 (α)j are infinitely many unit
directions, and additively the αj lie in the fixed rank-d module OK . This sounds promising. But in a fixed
basis the coeﬀicients of αj grow exponentially, controlled by the largest other conjugate, say ρj . To include
the first K powers as allowable translations in a coeﬀicient box, I need side length L ∼ ρK . Then K ∼ log L,
and the number of points in the box is n ∼ Ld . The number of directions is only K ∼ log L ∼ (log n)/d.
Again this is hypercube-scale, not lattice-scale, for fixed degree.
    Could the unit theorem give many multiplicatively generated directions? If I have many algebraic ele-
ments β with |σ0 (β)| = 1, products remain unit directions at the chosen embedding. In a number field of
unit rank r, elements of height up to L in a rank-r multiplicative lattice are counted like a power of log L,
perhaps (log L)r . The additive coeﬀicient box has size more like Ld . For fixed d, this is polylogarithmic in
n. If d grows with n, maybe there is an optimization, but then the additive ambient rank also grows, so the
point set size pays for it.
    There is also an exactness issue. Dirichlet units do not automatically satisfy |σ0 (ε)| = 1. The condition
that the log at the chosen complex place is exactly zero is one linear condition on the unit log lattice; its
intersection may have rank one less only if that coordinate functional has a rational relation on the lattice. In
CM fields the tempting “relative units of norm one have modulus one at the complex embeddings” thought
has to be handled carefully: for a CM field K over its totally real subfield F , the unit ranks are the same,
rK = rF , so the relative unit rank is zero. Norm-one relative units are only finite, essentially roots of unity.
So that naive CM source of many exact unit directions is not there.
    Maybe instead of units, take arbitrary algebraic integers whose chosen complex embedding has modulus
one. In the full Minkowski embedding, OK is a lattice, but its projection to one complex coordinate is dense
when the degree is bigger than two. Thus it is not absurd that many algebraic integers project onto the unit
circle while their other conjugates become huge. The set

                                            {x ∈ OK : |σ0 (x)| = 1}

could conceivably be infinite, because the chosen embedding gives only one real equation. But exact arith-
metic may impose more equations after expanding in a rational basis.
   For instance, take the rank-three group
                                                        √
                                             G = Z + Z 2 + iZ.
                            √
An element looks like a + b 2 + ic, and the unit equation is
                                                  √
                                            (a + b 2)2 + c2 = 1.
                √
Expanding in 1, 2 gives                                     √
                                         a2 + 2b2 + c2 + 2ab 2 = 1,
so ab = 0, and then the rational part is a positive definite equation.
                                                             √         Only finitely many possibilities.
    Similarly, if I take both real and imaginary parts in Q( 2),
                                                   √            √
                                          z = a + b 2 + i(c + d 2),


                                                        3
then                                                  √            √
                                         |z|2 = (a + b 2)2 + (c + d 2)2 .
Equating this to 1 gives
                                                    ab + cd = 0
           √
from the       2-coeﬀicient and
                                             a2 + c2 + 2(b2 + d2 ) = 1
from the rational coeﬀicient. The latter is positive definite, so again there are only finitely many integer
solutions. So the naive “dense projection intersects the circle often” heuristic can be killed by the algebraic
expansion in simple cases.
    Perhaps there is a theorem that a finitely generated Z-module of algebraic numbers intersects the unit
circle only finitely unless there is a cyclotomic/rational-lattice reason. I am not sure in that generality: an
additive subgroup of finite rank in C can certainly be dense, and intersections of finitely generated additive
groups with algebraic curves are subtle. But for positive definite norm forms over totally real coeﬀicient
fields, the expansion bounds all coeﬀicients.
    However, coordinates in the unit-distance problem are not required to be algebraic. With arbitrary real
generators, I can impose finitely many circle equations by construction. For each desired integer coeﬀicient
vector vj , the condition that the corresponding linear combination of generators has modulus 1 is one
quadratic equation in the real and imaginary parts of the generators. If I allow as many generators as desired,
I can simply take the unit vectors themselves as generators; that recovers the hypercube construction. To
beat it, I would need many unit vectors with many additive relations, i.e. many prescribed points of the unit
circle lying in a low-rank additive group. Roots of unity give such relations but not enough compression;
rational unit-circle points after clearing denominators reduce to Gaussian lattice directions; generic unit
directions have no additive compression at all.
    So the same dichotomy remains. Rank two lattices give the classical divisor-function lower bound. High-
rank generic directions give only n log n. Cyclotomic compression gives at most polylogarithmic improvement
in the degree. Fixed-degree algebraic powers have coeﬀicient heights growing exponentially, again giving only
logarithmically many usable directions for a polynomial-sized box. None of these easy constructions produces
the arbitrarily large constant in the 1 + C/ log log n exponent that would be needed for a negative answer,
and none of the standard incidence/graph constraints gives the near-linear upper bound needed for the
aﬀirmative.
    Another variant is to parametrize the unit circle rationally and look for parameters t for which the
resulting directions all lie in a very low-dimensional additive group, then take a large generalized progression
in that group. If the t’s are rational with a common denominator, though, I am just back in a cleared Gaussian
lattice. If I take t’s in a geometric progression, the denominators multiply; after clearing denominators the
finite set still sits in a scaled lattice over localized rationals, and the count of available directions is governed
by divisor-type bounds. So this does not immediately escape the classical construction.
    The lattice model therefore remains the benchmark. It gives a fixed constant in the numerator of
1 + c/ log log n. Beating the proposed upper bound would need a mechanism that makes that effective
constant grow rather than merely reproducing the same scale.
    A quantifier or asymptotic loophole would still have to change this comparison. The lower bound is often
stated in the same form: for infinitely many n, ν(n) ≥ n1+c/ log log n . The desired upper has an unspecified
constant C and must hold for all large n. Could padding or monotonicity turn the known lower bound with
fixed c into failure for every C? No, not in the obvious way.
    Suppose I have a construction of size m with
                                               em ≥ m1+c/ log log m .
If I add isolated points to get n ≥ m, I keep em edges but the right side n1+C/ log log n grows roughly like n,
so padding makes the comparison harder, not easier. What about disjoint unions? If I take k copies, then
                                     n = km,        e ≥ kem = n mc/ log log m .
The effective exponent constant, measured against n, is
                                                        
                                                 log m     log log n
                                     Ceﬀ = c                         .
                                               log log m     log n

                                                         4
This is maximized when k = 1 up to small changes; making many copies only decreases it. So there is no
amplification of the constant.
    What about a genuine blow-up? Replace every point by a cluster and hope every unit edge becomes a
complete bipartite graph. But Euclidean distance one is too rigid. If two centers are distance one, I cannot
put two or more points near one center and three near the other so that all cross distances are exactly one:
the common intersection of unit circles is tiny. Unit distance graphs do not contain arbitrary Ks,t ; already
K2,3 is impossible. So blow-ups do not give the missing quantifier either.
    Known upper-bound technology does not seem to imply this after a simple recombination. Unit-distance
graphs have no K2,3 , giving only the usual codegree-type O(n3/2 ) extremal scale; the crossing lemma and
incidence geometry improve to the classical O(n4/3 ). Separator theorems for string graphs are not enough
because a unit segment can be crossed by many other unit segments. If there are many crossings, the
endpoints of two crossing unit segments contain shorter distances; maybe one can charge recursively over
distance scales. That kind of idea exists around distinct distances, but I do not see it giving near-linearity.
    Can distinct-distance machinery help? Guth-Katz bounds the number of equal-distance quadruples by
O(n3 log n). If there are e unit pairs, they alone give about e2 equal-distance quadruples. Hence
                                                         p
                                                e ≲ n3/2 log n,

which is much weaker than even n4/3 . Higher moments or distance energy on the circle would be needed.
That is essentially the hard part.
    Spectral or Fourier bounds also stop short. The adjacency matrix is obtained by thresholding the Eu-
clidean distance at one. The circle measure has Fourier transform J0 , which changes sign; there is no simple
positive-definite kernel giving an edge bound. Delsarte-type bounds are useful for independence or coloring
in some metric graphs, not for the maximum number of edges in an arbitrary finite induced subgraph.
    Semi-algebraic graph extremal theorems also stop too early. A bounded-complexity semi-algebraic graph
in the plane with no Kk,k has polynomial incidence bounds, but the exponents are around 3/2 or, with
geometry, 4/3. To get n1+o(1) one must use much more than a fixed forbidden bipartite graph.
    Rigidity is tempting. A graph with more than 2v − 3 edges is generically overconstrained as a unit
framework, and dense graphs should contain rigid Laman-type subgraphs. But all lengths being equal is a
very special nongeneric condition. The triangular lattice has many rigid pieces and still exists; the Erdős
lattice construction has average degree growing slowly. One would need to classify the special algebraic
dependencies that allow many equal-length edges. That is not an easy extremal graph argument.
    Directions give another language. For a unit vector u, let

                                             r(u) = |P ∩ (P − u)|.
                                              P
Then the number of ordered unit edges is u∈S 1 r(u), and unordered edges are half of that. High unit-
distance count means many translations by unit vectors have large overlap with P .
    This suggests additive combinatorics. If there are m popular unit translations, each with overlap about t,
then e ∼ mt. Composing translations gives paths in P , and sums of selected unit vectors appear as endpoint
differences. A finite set U on a strictly convex curve ought to have large sumsets: U + U , kU , etc. If P
supports many partial translations by elements of U , then too many sums should have to live inside P − P ,
which has size at most n2 . This is the right-looking philosophy.
    But quantitatively it is hard. Ordered sums of directions have unavoidable collisions from permutation;
polygonal relations among unit vectors create more collisions. For generic directions, k-fold sums are huge,
but the directions arising in a dense unit-distance configuration need not be generic. They could be the
rational directions from the lattice construction, where multiplicative/additive structure is exactly what
produces many edges. So an inverse theorem would be needed: either the directions expand strongly, or
they live in a structured group that can be bounded number-theoretically.
    Finite fields provide another test. Over F2q , the unit-distance graph can be much denser; for appropriate
n one sees n4/3 -type behavior. Could such configurations be lifted to real exact unit-distance configurations?
The constraints are polynomial equations

                                         (xi − xj )2 + (yi − yj )2 = 1



                                                      5
for the chosen edges, plus inequalities for distinctness. A graph realizable over finite fields of arbitrarily
large characteristic has, by a Lefschetz-type principle, a realization over an algebraically closed field of
characteristic zero, if the same finite graph is realized infinitely often. But that is over C with the quadratic
form x2 + y 2 , not over the ordered real plane with positive definite distance. The real positivity is the
obstruction. Finite-field unit-distance graphs are not automatically real Euclidean unit-distance graphs. So
that route fails, at least naively.
    Graph coloring gives no edge bound either. The plane has finite known colorings, but a subgraph of a
7-colorable infinite graph can still be dense in principle; geometry is doing all the work. Local packing also
fails because points may be arbitrarily close, and one point can have arbitrarily many unit neighbors on
its surrounding circle. The only simple local restriction is that two vertices have at most two common unit
neighbors.
    Algebraic specialization changes the flavor of the examples but not yet the estimate. Given any real
realization of a finite unit-distance graph, the coordinates satisfy a finite semialgebraic system over Q. If it
has a real solution, it should have a real algebraic solution after suitable specialization of a transcendence
basis, preserving the required nonzero inequalities. So in principle all extremal examples can be taken
algebraic. But the degree and height of that algebraic realization can be enormous — exponential or worse
in n — and I do not see how to convert “algebraic” into a useful lattice/divisor bound.
    Maybe that enormous degree is not just an annoyance but a source of possible counterexamples. Number
fields deserve a closer look.
    In the Gaussian integer construction, the useful unit directions are ratios
                                                        u = π/π̄
or products of such ratios, where π runs over Gaussian primes. They are S-units of complex absolute value
one. If I choose many primes and exponents bounded by M , I get about (2M + 1)r unit directions; clearing
the common denominator produces a Gaussian lattice box whose size is controlled by the product of the
prime norms. Optimizing gives the usual divisor-function scale, not arbitrary constants.
   Could a higher-degree number field produce many more unit-modulus elements per amount of denomi-
nator? Take a number field K with one chosen complex embedding σ0 : K → C. An S-unit x satisfying
                                                       |σ0 (x)| = 1
is a unit direction in the plane. The S-unit group has rank roughly |S| + r1 + r2 − 1, and the single equation
log |σ0 (x)| = 0 cuts one linear condition. So there could be a high-rank lattice of unit directions.
    But then I need a finite point set P that is stable enough under adding these directions. In degree > 2,
the image σ0 (OK ) is usually dense in C; it is not a discrete planar lattice. I cannot just take all elements in
a large disk. I need to bound all embeddings, i.e. take a Minkowski box in K, and count algebraic integers
whose conjugates lie in prescribed ranges. Adding a direction x with |σ0 (x)| = 1 may have enormous size
in the other embeddings, so the box must be enlarged in those coordinates. The point count is then a
d-dimensional volume, not a two-dimensional area. The bookkeeping may kill the gain.
    For K = Q(i), this bookkeeping is exactly the common-denominator lattice. For a general K, if I choose
algebraic integers ai and set
                                                   ui = ai /ai
in some CM-like situation, then products
                                                       Y
                                                uS =        ui = AS /AS
                                                        i
                                                                                                    Q
have modulus one at the chosen embedding. Clearing denominators uses something like D =                 i ai , so all
               −1
the uS lie in D OK . The required box scale in each embedding involves factors such as
                                      Y
                                          max(|σj (ai )|, |σj (ai )|).
                                            i

Thus the “number of sign choices” has to be compared with a product over all embeddings. It is not enough
that a rational prime splits into many ideals and gives 2g formal choices; the archimedean and discriminant
costs may have already paid for those choices.


                                                             6
    Still, I do not know a quick theorem saying the Gaussian case is optimal among all number fields. Maybe
the unit-distance conjecture can be phrased as exactly such a uniform bound for S-unit directions plus an
inverse theorem reducing to them. The subspace theorem literature contains unit-distance bounds with
restricted direction sets, and results saying that if the direction set has bounded multiplicative rank then
the number of unit distances is n1+ε . The catch is that the rank in the lattice construction itself grows like
log n/ log log n; bounded-rank theorems do not settle the conjecture.
    There is also a direction-set result: if the number D of directions determined by unit edges is only
O(n1/3 ), then one can get o(n4/3 ) unit distances; near the n4/3 bound requires many directions. But for the
conjectural scale E = n1+η , the trivial lower bound is only D ≥ E/n = nη , which is subpolynomial when
η = O(1/ log log n). Existing restricted-direction results seem far too coarse.
    Maybe cycles give algebraic control over directions. Along every cycle in the unit-distance graph there
is a relation
                                            ±u1 ± u2 ± · · · ± uk = 0
among unit complex numbers. A graph of average degree d contains a cycle of length O(log n/ log d). If
d = exp(C log n/ log log n), this gives cycles of length O(log log n). Short vanishing sums of roots of unity
are highly constrained by Mann-type theorems. Unfortunately our directions are arbitrary points of the unit
circle, not roots of unity. A closed polygon with k unit sides has continuous moduli for k ≥ 4. So a single
short cycle imposes little.
    What about many cycles, or theta graphs: many internally disjoint unit paths between the same two
vertices? The endpoint distance of a unit l-step path can vary continuously in [0, l], so even that is not
discrete unless the graph is rigid. Again I hit the rigidity wall.
    An elementary bounded-direction estimate starts weakly. For each direction, edges lie along parallel lines
and contribute at most n edges, so E ≤ nD. Crossing lemma gives E 3 /n2 crossings, but the upper bound
in terms of D is poor: an edge in one direction can be crossed by many unit segments in another direction
if the point set is dense. Counting supporting lines also does not help enough.
    The translation viewpoint remains cleaner. If U is the set of used directions, and the partial maps
p 7→ p + u have large domains, then compositions should create many paths. With randomness one would
expect about n(t/n)k mk paths of length k, and endpoints differ by sums from kU . A rigorous dependent-
random-choice version might find a subset of points with many common translations. But collisions, domain
shrinkage, and structured U are exactly the diﬀicult parts.
    Multiplicative rank also stops short. Every finite direction set U ⊂ S 1 lies in a multiplicative group
of rank at most |U |. Restricted-rank theorems would give n1+ε if the rank were Oε (1), or maybe small
compared with log n. But in a hypothetical configuration with

                                             E = n1+K/ log log n ,

the number of directions could be as large as E, and even the minimum E/n is no(1) , much larger than
a fixed rank. The Gaussian construction already needs rank tending to infinity. So the self-contained
route would have to combine an inverse additive-combinatorial statement for arbitrary directions with sharp
number-theoretic control of the structured case. I do not see a completed path.
    A direction-count estimate of the crude form E ≲ nDε would give at best n1+ε , i.e. no better than the
trivial “number of directions times n” estimate unless D is already subpolynomial. I do not see a way of
closing the estimate this way.
    The high-degree S-unit idea can be made more concrete. Suppose I take K = Q(θ), θ3 = 2, and look at
a complex embedding, say θ = 21/3 ω. One naive experiment would be: take elements a + bθ + cθ2 , embed
them in C, and ask how many integer triples of height at most H land on the unit circle. But for algebraic
integers this is finite and probably uninteresting. If I allow ratios, S-units, then I want elements whose
chosen complex absolute value is one.                             √
    The Gaussian construction has the form u = a/ā. In K = Q( 3 2), though, the relevant conjugate is not
an automorphism of the field under the chosen embedding; it lives in the Galois closure. A Galois field, or
at least a field with an involution τ that becomes complex conjugation in the distinguished embedding, is
better suited. Then for any a ∈ K,

                                                 u = a/τ (a)


                                                      7
    has |σ0 (u)| = 1. This is the natural generalization of Gaussian prime ratios. So a CM/Galois-type field
is the right playground.
    Take K = Q(ζ5 ) as a toy model. If a ∈ OK , then u = a/ā is a direction. If I choose a1 , . . . , as , then the
subset products
                                                 Y
                                           uS =      ai /āi = AS /ĀS
                                                    i∈S

   are all unit-modulus directions. Clear denominators with
                                                    Y
                                               D̄ =    āi .
                                                                i

   Then
                                                            Y
                                                 u S = AS           āi / D̄,
                                                             ∈S
                                                            i/

    so all directions lie in D̄−1 OK . Now take a finite set P to be the image, under σ0 , of numerator
                                −1
elements inQ some box inside D̄ OK . Adding uS is just translating the numerator by an algebraic       integer
bS = AS i /∈S āi . If my box contains most of its translates by all the bS , I get roughly 2s |B| directed
incidences, up to boundary.
    So the question is: how large must the numerator box be in order to contain all those bS ? In a coeﬀicient
basis the sizes can grow badly. In the full Minkowski embedding the bookkeeping is cleaner. For each i, in
each embedding I choose either ai or āi . Thus, to contain every product, the side scale in embedding j must
be at least
                                           Y
                                              max(|σj (ai )|, |σj (āi )|).
                                             i

   The resulting volume factor for one ai is
                                        Y
                                                 max(|σj (ai )|, |σj (āi )|).
                                             j

   Pair conjugate embeddings. If the two magnitudes are A, B, the contribution is max(A, B)2 , whereas the
norm contribution is AB. Thus the ratio is

                                        max(A, B)2
                                                     = max(A/B, B/A) ≥ 1.
                                           AB
    So the embedding-box volume is at least the norm of the denominator, with equality only when the
conjugate magnitudes are balanced. If I just use prime elements with small norms, I get 2s directions and
volume about the product of the norms. Taking the first s rational primes gives log n ∼ s log s, hence
2s = exp((log 2 + o(1)) log n/ log log n), exactly the classical flavor. Degree has not helped yet.
    But maybe splitting helps. Suppose K is a Galois CM field of degree 2g, and a rational prime p splits
completely into 2g primes of norm p, paired by complex conjugation. If I have principal generators πj , π̄j , then
each ratio πj /π̄j is a unit direction. Using all g conjugate pairs gives 2g sign choices, while the denominator
norm is pg . For a single p, directions versus norm is 2g versus pg , so if p is fixed at 2, that would be directions
comparable to the denominator volume. Then a box of size n ∼ 2g would have degree ∼ n, i.e. quadratically
many unit distances. That cannot be right.
    The first apparent catch is whether a fixed small prime can split completely in fields of arbitrarily high
degree. In a monogenic order, reducing a defining polynomial mod 2 cannot give more than two distinct
linear factors over F2 . But that is only a monogenic-polynomial obstruction. A finite étale F2 -algebra can
be Fd2 for arbitrary d, and class-field-theoretically there are number fields in which a prescribed prime splits
completely. So the “2 cannot split” objection is not fundamental.
    Maybe the ideals are not principal. I could pass to powers, paying the class number. But even if I take
powers, the known O(n4/3 )-type upper bounds already rule out any construction that really gives exponent


                                                            8
near 2. So there must be a large archimedean cost hidden in the generators. A generator of a prime ideal
over 2 in a huge field may have enormous conjugates in the chosen embedding pattern. The norm is 2, but
the Minkowski box needed to contain it may involve the discriminant/regulator. Minkowski gives generators
with bounds involving the discriminant; if the root discriminant is large, the volume loss is huge.
    This suggests a more refined number-field lower-bound problem. If I had a tower with bounded root
discriminant and a fixed prime splitting completely, perhaps the generators could √      be kept under some
exponential-in-degree control. Then the construction might give something like exp(c log n) extra degree,
or maybe still only the Erdős subexponential. For degree d = 2g, root discriminant R = ∆1/d , a generator
of an ideal of norm p may have sup-norm bounded by something like a power of R times p1/d , but doing this
for g different primes/ideals and all subset products multiplies the archimedean imbalance. It is exactly the
regulator/discriminant cost that the naive norm calculation ignored.
    I do not know a ready-made theorem here. There is literature around unit-distance graphs with coordi-
nates in fields, and around S-unit equations, but this precise dense construction via one complex embedding
and denominator-cleared OK -boxes seems to require all-embedding control. Projecting a high-dimensional
lattice to one complex embedding is dense; I cannot count points by planar area. I must restrict in the other
embeddings or in coeﬀicient space, and that is where the volume appears.
    Could I instead prove the desired upper bound by forcing all configurations into some algebraic number
field and then using factorization? Given a unit-distance graph on P , choose edge direction variables ze
with |ze | = 1; the vertex coordinates are sums along paths and cycle constraints are polynomial equations
with rational coeﬀicients. There should be algebraic solutions after specialization, avoiding finitely many
inequalities, but quantifier elimination would give degree and height maybe exponential or worse in n. A
divisor bound in a field of degree exp(poly n) is useless. Rigidity might reduce variables for dense graphs,
but I do not see a sharp degree bound.
    Also, configurations can have genuine continuous parameters. Rhombus chains, zonotopal grids, and
generic-direction hypercubes all give unit-distance graphs with flexible angles. The hypercube example is
the clean model: choose d unit vectors and take all subset sums. Then n = 2d and e = d2d−1 ∼ 21 n log2 n.
More generally a box [0, L]d has n ∼ Ld and e ∼ dn. This is much weaker than the lattice lower bound, but
it shows that transcendental directions are not automatically irrelevant.
    To get more edges from such a progression, I would need many unit vectors in a low-rank additive group.
Let g1 , . . . , gr ∈ R2 . A direction is an integer vector v ∈ Zr with
                                                       X
                                                           vi gi = 1.

    Equivalently, for the 2×r matrix A, I am counting integer v in a box with kAvk = 1. Here Q(v) = v T AT Av
is a positive semidefinite quadratic form of rank at most 2. Since I can choose A with real entries, can I
make Q(v) = 1 for many integer v, while keeping the map injective on the relevant integer box?
    For r = 3, write the group as Z + Zi + Zz, z = α + iβ. Unit directions correspond to triples (a, b, c)
satisfying

                                         (a + cα)2 + (b + cβ)2 = 1.
    For a generic z, there are no such triples except the obvious ones. Could I choose z perversely so that
for many c’s the point cz is exactly distance 1 from an integer lattice point? Each desired solution says z
lies on a small circle

                                       (α + a/c)2 + (β + b/c)2 = 1/c2
  in the parameter plane. I was tempted by a nested-circle construction: choose rational centers approxi-
mating a limiting z, with radii 1/c, and force z to lie on all of them.
  But two such circle conditions already almost determine z. Subtracting

                                      |cz + m|2 = 1,       |dz + n|2 = 1
    eliminates part of the quadratic term and gives a linear relation involving α, β, |z|2 ; geometrically two
circles meet in at most two points. So after two independent unit relations, z is algebraic of degree at
most two over the rational data. Additional exact hits become arithmetic miracles, not freely imposed


                                                       9
approximations. If all the small circles are identical, then I am just repeating the same direction. Thus the
dense rank-three fantasy runs into algebraic rigidity.
   The Gram-matrix language captures this. Let G = (gi · gj ). A unit relation v imposes

                                     v T Gv = 1,      or     tr(Gvv T ) = 1.
    These are linear equations in the symmetric entries of G, plus the nonlinear constraint that G is positive
semidefinite of rank 2. If I have enough integer solutions v, perhaps G is forced into a rational/algebraic
low-dimensional family. If G were a rational rank-two matrix with r > 2, its kernel would contain rational,
hence integer, vectors; that would create collisions in the additive group. For r = 2, rational G is exactly
the lattice/Gaussian-type situation: after scaling, a2 + b2 = R2 and divisor bounds count the directions. For
r > 2, injectivity and rational rank two are incompatible.
    This made me wonder whether a finite-rank subgroup of the plane can have only O(r2 ), or maybe rO(1) ,
points on the unit circle unless it has a rank-two lattice component. That would be very useful. Then a
MathOverflow-style rank-four example corrects the guess and changes the picture. Take an algebraic number
α of degree 4 with one conjugate on the unit circle, not a root of unity. The additive group Z[α], under
that complex embedding, has rank 4 and contains the infinitely many unit-circle points αk . So the naive
finite-rank obstruction is false; this reopens the high-rank algebraic route, provided I can control coeﬀicient
growth.
    However, the coeﬀicient height of αk grows exponentially, controlled by another conjugate of modulus
λ > 1. If I take all powers |k| ≤ K, then the coeﬀicient box side must be L ∼ λK , while the number of
directions is only M ∼ K ∼ log L. A rank-four box has n ∼ L4 , so this gives at most n log n-type edges.
Not dangerous.
    Could I amplify this with many independent algebraic numbers of modulus one? In a degree d field,
suppose I had r multiplicatively independent units whose distinguished complex absolute value is 1, with
heights bounded reasonably. Products of exponent size K would give roughly K r directions, while an additive
box of side L in degree d has n ∼ Ld . The heuristic is

                                       directions ∼ (log L)r ,     n ∼ Ld .
     If r is proportional to d and L is not too large, this can become a power of n. So the existence and
regulator of such “unit-circle units” matters.
     Dirichlet’s unit theorem alone does not give them. For a chosen complex embedding σ0 , the condition
|σ0 (ε)| = 1 is one real linear equation on the logarithmic unit lattice. But a homomorphism from Zr to R
can easily be injective if the coordinate values are Q-independent; the kernel need not have rank r − 1. In
CM fields, the relative-unit intuition is also misleading: units with ε/ε̄ give phases, but ε itself need not have
|σ0 | = 1, and the relative unit rank of a CM extension over its maximal real subfield is zero. In non-CM
Galois fields with complex places, symmetries of the log lattice may force some coordinate-zero units, but
I do not know how large that subgroup can be. Salem-type degree-four examples give rank-one behavior.
High rank with small regulator would be a serious construction route, but the archimedean/discriminant
costs are exactly the part I cannot ignore.
     Either a real upper bound or a real counterconstruction is needed.
     In additive language, put the point set in C. Then I am counting pairs a, b ∈ A with a − b ∈ S 1 . The
standard lower bound is the scaled integer lattice: choose an integer with many representations as a sum
of two squares, scale so those representation vectors have length 1, and take a large square patch. Each
represented direction gives about n translates, and the number of directions is a divisor-function quantity,

                                             exp(O(log n/ log log n)).

So to disprove the conjectured upper bound I would need an average degree larger than exp(C log n/ log log n)
for arbitrarily large fixed C, not just a polylogarithm.
    The most naive way to make many unit directions is useless. If I choose k unit vectors and take all subset
sums, then n = 2k and the obvious unit edges are only about k2k−1 , i.e. n log n. If I take a box [m]k mapped
into the plane by k unit vectors, then

                                  n = mk ,      e ≈ k(m − 1)mk−1 = n · k/m.


                                                        10
Optimizing with m = 2 still gives only n log n. Thus independent directions are not enough. The target
is many unit directions living in a low-rank additive group, so that a box in that group is Følner for all of
them.
    So suppose
                                          Γ = Zz1 + · · · + Zzr ⊂ C
is injective as a rank r abelian group, and U = Γ ∩ S 1 . If P is a coeﬀicient box of side M , then |P | ∼ M r .
Each unit u ∈ U whose coeﬀicient vector is much smaller than M contributes roughly |P | edges. Everything
reduces to how many points of the coeﬀicient box lie on the Euclidean unit circle.
    A dangerously naive heuristic says that
                                                   X              2
                                                         a i zi       =1

is one quadratic equation in r integer variables, hence maybe ∼ T r−2 solutions of coeﬀicient size T . But if
that were true, taking n = T r would give degree T r−2 = n1−2/r and

                                                   e ∼ n2−2/r ,

which beats the Szemerédi-Trotter n4/3 bound for large enough r. So this heuristic is false in the planar
situation. The coeﬀicients zi usually impose many arithmetically independent real constraints, even though
analytically I see only one circle equation. In fact ST itself gives a strong indirect bound on these intersections.
    There are known ways for Γ ∩ S 1 to be infinite. Take an algebraic integer or unit α with one chosen
complex embedding on the unit circle and not a root of unity. The additive group generated by a basis of
its field contains αk , all unit vectors in that chosen embedding. But in a fixed integral basis the coeﬀicients
of αk grow exponentially at a rate governed by the other conjugates. If H is the house away from the
distinguished embedding, then coeﬀicient height ≤ T gives only

                                                             log T
                                                    k≲             .
                                                             log H
One small-house unit gives only logarithmically many directions.
   Can I make H extremely close to 1 by taking high degree? Dobrowolski-type lower bounds say that for
a non-root-of-unity algebraic integer one cannot have the house too close to 1; roughly
                                                                            3
                                                     1           log log d
                                             log H ≳
                                                     d             log d

in the relevant non-torsion regime. Even optimistically, this turns one generator into something like
                                                                          3
                                                               log d
                                               d log T
                                                             log log d

visible powers. That is not the exponential-in-d supply I would need.
     Many independent modulus-one units would be more potent. If I had a rank R group of units u with
|σ0 (u)| = 1, then products with exponents |ei | ≤ E would give about E R unit directions. Since coeﬀicient or
archimedean height usually grows exponentially in E, E would be comparable to log T . Thus the direction
count would be
                                                   (log T )R .
If R were proportional to the field degree d, this would be

                                                 exp(d log log T ).

Compare this to the Erdős allowance for a point box of size T d :
                                                              
                                                    d log T
                                          exp C                  .
                                                 log(d log T )

                                                             11
For regimes such as log T ∼ log d, the many-unit count looks much larger than the allowed factor.
    But the condition |σ0 (u)| = 1 is exact and nongeneric. Dirichlet gives a log lattice of units, but intersecting
it with the coordinate hyperplane log |σ0 (u)| = 0 can easily have rank zero. A homomorphism Zr → R with
irrationally related values has no nontrivial kernel. So I cannot just invoke unit rank.
    CM fields are the first tempting source: x/x̄ has modulus one. But for integral units in a CM field the
relative unit rank over the maximal real subfield is zero; the ranks of the CM field and the real subfield are
equal. The norm-one integral units are finite up to roots of unity. Quotients x/x̄ may exist as S-units or
have denominators, but they do not immediately give a large integral unit subgroup inside a fixed additive
lattice.
    The word “unimodular” needs care here. If a statement said that, in a degree d additive box of side N ,
there are  N d/2−1 elements of complex modulus one in a fixed planar embedding, then putting the whole
box into the plane would give average degree N d/2−1 . For n = N d , that would mean
                                           e ∼ N d+d/2−1 = n3/2−1/d ,
which violates Szemerédi-Trotter once d is large. So that cannot be the interpretation. In number theory
“unimodular” often means norm ±1, an algebraic unit, not a unit vector in the distinguished complex plane.
That resolves the apparent contradiction.
     The compositum idea also fails quantitatively. Take s independent quartic reciprocal fields, each giving
a unit αj whose chosen value lies on S 1 . Products α1e1 · · · αses give (log T )s directions. But the compositum
degree grows like 4s in the independent case, so s ∼ log d, far too small relative to the additive rank. This
is no better than a polylogarithmic decoration in the final n.
     Maybe a completely different construction? A union of rotated or translated lattice patches? For a single
rational lattice, unit directions reduce to integer solutions of x2 + y 2 = D2 , and the divisor bound is exactly
the classical lower-bound scale. If I take two cosets of a lattice, cross differences lie in a shifted lattice. Then
I am counting lattice points on a circle with arbitrary center, not necessarily centered at a lattice point.
Could arbitrary centers support many more lattice points?
     At first that looks plausible: geometrically a circle of large radius intersects a fine lattice in about its
circumference many approximate points. But exact points are rigid. If a circle contains three integer lattice
points, its center is determined by perpendicular bisectors with integer coeﬀicients; the center is rational,
with denominator controlled by determinants of chord vectors, hence polynomial in the radius. After clearing
denominators, the problem is again an integer quadratic equation of polynomially related size, and divisor-
type bounds return. Jarník-type convex curve bounds are much weaker, but the exact circle arithmetic is
still subpolynomial. So shifted cosets of rank-two lattices do not obviously beat the Erdős construction.
     What about using a very fine lattice δZ2 and choosing shifts so that many exact intersections occur? For
a fixed shift s, directions from one coset to another solve
                                           (δa + sx )2 + (δb + sy )2 = 1.
Again this is a circle through lattice points after scaling. Unless the center/radius arithmetic is special, there
are few; if it is special, it is still controlled by representation/divisor phenomena. Multiple layers would
require many pairwise shifts all with rich circle intersections, and I do not see a mechanism.
    Finite-field analogues are also seductive and useless unless one can preserve the exact Euclidean quadratic
equation over R. Roots of unity give many points on the unit circle, but chord length 1 occurs only for special
angular separations. Points on many concentric circles give only O(m) incidences between two circles, because
a unit circle around one point meets another circle in at most two points. None of these geometric toys yields
a high average degree.
    A nearby algebraic detour remains relevant. A rank-four additive subgroup of C can intersect the unit
circle in a set governed by an elliptic-curve-like intersection of quadrics. That sounds more flexible than
the rank-two lattice picture, but I do not yet see how to turn those points into many translations with one
controlled common denominator.
    Arbitrary dense graphs cannot simply be drawn with all edges length 1. Locally a vertex can have many
unit neighbors, but cycles impose equations. A generic bar-and-joint framework in the plane has only 2n − 3
independent distance constraints. Dense unit-distance graphs must come from many algebraic dependencies,
like lattice directions, not from a generic realization. The graph-theoretic K2,3 -type obstruction gives only
around n3/2 , and crossing gives n4/3 . The desired scale is far below that.


                                                        12
    Number fields remain the only route here that looks capable of producing (log T )R directions. Is it
actually possible to have R  d exact modulus-one units?
    Let F be totally real of degree m, and let K/F be quadratic. Choose the extension so that, at one
real embedding of F , K becomes complex, and at the other m − 1 real embeddings it splits into two real
embeddings. Then K has degree d = 2m, signature

                                      r1 (K) = 2(m − 1),        r2 (K) = 1.

So
                                             ×
                                       rank OK = r1 + r2 − 1 = 2m − 2.
Meanwhile rank OF× = m − 1. The relative norm-one unit group should therefore have rank

                                         (2m − 2) − (m − 1) = m − 1.

And if u has relative norm one, then at the unique complex place lying over the exceptional real embedding,

                                          |σ0 (u)|2 = σ0 (NK/F u) = 1.

So these relative units are literally unit vectors in the distinguished planar embedding. This is exactly the
rank-proportional supply I was looking for.
   Quantitatively, suppose s = m−1 ∼ d/2 independent relative units are available with manageable height.
Products with exponent box size E give E s directions. If a point set is an additive box of size N d , and if
the products have additive coeﬀicient size ≤ N when E ≲ log N/L0 , then the log number of directions is

                                                    s log E.

Writing L = log N , the Erdős benchmark in the exponent is

                                                       dL
                                                            .
                                                    log(dL)

Thus the comparison ratio is roughly
                                                   s log E
                                                             .
                                                 dL/ log(dL)
If s/d is a positive constant and L can be as small as log d, this ratio wants to grow like log log d. That would
beat every fixed constant in the Erdős exponent. If, on the other hand, the fundamental relative units have
logarithmic height L0 polynomial in d, then L must be polynomial in d before any exponent box appears,
and the advantage disappears. So the size of relative units and the regulator are critical.
    Coeﬀicient height in an integral basis is also a bad invariant. A unit may have small archimedean height
and awful coordinates in a skew basis. Minkowski space is cleaner. Let

                            PM = {x ∈ OK : |σ(x)| ≤ M for all archimedean σ}

or a comparable symmetric box in the full archimedean embedding, and then project x to the distinguished
complex embedding. This projection is injective on K, so the planar points are distinct.
    For a fixed field, geometry of numbers predicts

                                                         Md
                                                |PM |  p
                                                          |DK |

once M is large enough relative to the lattice. A relative unit u with all non-distinguished archimedean sizes
≤ cM and |σ0 (u)| = 1 translates a large sub-box of PM into a slightly larger box; with margins it should
contribute  |PM | unit edges. The number of such units is a log-lattice count:

                                                                 (log M )s
                                       #{u : |σi (u)| ≤ M }               ,
                                                                    Rrel

                                                       13
where Rrel is the covolume/regulator of the relative unit log lattice, ignoring boundary constants.
  This gives the heuristic lower bound

                                                            (log M )s
                                         ν(PM ) ≳ |PM | ·             .
                                                               Rrel
   Now the dangerous regime is clearer. Imagine a family of these almost-totally-real quadratic extensions
with bounded or modest root discriminant, relative rank s  d, and relative regulator only exp(O(d)). Take
M ∼ d. Then
                                           log |PM | ∼ d log d
(up to the discriminant term), so
                                                  log n
                                                          ∼ d.
                                                log log n
But the log of the number of bounded relative units is heuristically

                                 s log log M − log Rrel ∼ cd log log d − O(d).

That factor is exp(d log log d − O(d)), which would dominate exp(Cd) for any fixed C. It still sits far below
n1/3 , so it would not contradict Szemerédi-Trotter. It would specifically attack the Erdős-scale bound.
    So something has to be paid for here: perhaps such signature families have huge discriminant, perhaps
the relative regulator is at least about a power like (log d)cd , perhaps the Minkowski lattice has enormous
covering radius so M ∼ d contains far fewer points than its volume, or perhaps the bounded-unit count
is much less uniform than the fixed-field heuristic suggests. But at this point the obstruction is not the
elementary incidence bound; the obstruction has to be arithmetic or geometry-of-numbers in the varying
field.
    The estimate I just wrote is alarming: after subtracting an exp(cd)-type regulator, I still get something
like
                                             exp(d(log log d − c)).
If I take a Minkowski box with M ≈ d, the number of projected algebraic integers is supposed to be n ≈ dd ,
while the degree in the unit-distance graph would be exp(d log log d). The Erdős allowance at that value
of n is only exp(O(d)), since log n ∼ d log d and log log n ∼ log d. So this toy calculation would beat the
conjectured bound.
     The apparent mistake needs locating, not just noting.
     Projection itself is not the mistake: I am using the full Minkowski embedding, but the actual planar set
is obtained by projecting to one complex embedding. Could different algebraic integers collapse to the same
planar point? No: a field embedding K ,→ C is injective. Distinct x’s stay distinct in the plane.
     Translation preservation also survives the first check: if u is a relative unit with modulus 1 in the
distinguished complex embedding, then translation by σ0 (u) is a unit-length planar translation; but does
adding u preserve the finite set? In the Minkowski model,

                                          σ(x + u) = σ(x) + σ(u).

So if I choose x with all archimedean coordinates  M , and choose u with all archimedean coordinates
 M , then a positive proportion of the box should survive the translation. That part also looks formally
fine.
    Szemerédi-Trotter gives a consistency check. If the point set has

                                                     Md
                                                  n∼ √
                                                       D

points, then any family of unit translations contributing  n edges each must have size at most O(n1/3 ), up
to constants, because the total number of unit distances is O(n4/3 ). For M = d, this upper allowance is
                                                                        
                                            dd/3          d
                                    n1/3 ∼ 1/6 = exp        log d + O(d)
                                            D             3

                                                      14
if the root discriminant is bounded.
    My relative-unit count was only about
                                        (2L)s
                                              ,      L = log M, s ≈ d/2.
                                         Rrel
With M = d, and Rrel merely exponential, this is
                                                              
                                            d
                                     exp       log log d + O(d) ,
                                            2

which is much smaller than exp((d/3) log d). So there is no contradiction with ST. The proposed construction
sits in the gap: far below n4/3 , but above n exp(Cd).
    So the obstruction, if there is one, has to be number-theoretic: the fields do not exist in the needed form,
or the relative regulator is much larger, or the lattice-point asymptotic is not uniform at M = d.
    The required field shape is an almost-totally-real quadratic extension. Let F be totally real of degree m,
and K/F quadratic, complex at one real place of F and split real at the other m − 1 places. Then K has
r2 = 1, r1 = 2m − 2, and the relative norm-one unit rank is

                                     (2m − 2) − (m − 1) = m − 1 ≈ d/2.

At the unique complex place, norm-one means |σ0 (u)| = 1. Perfect.
    But can such fields have controlled discriminant and controlled relative regulator as m → ∞? Class field
towers preserve signature if they are totally real unramified towers. If I first make a quadratic extension
complex at one infinite place and then go up a Hilbert class tower, the number of complex places multiplies;
I no longer have r2 = 1. To keep r2 = 1, I need fields of arbitrarily high degree with exactly one complex
place — “almost totally real” fields — not just a tower over a fixed complex base.
    Maybe discriminants of fields with fixed r2 grow too fast? Minkowski’s bound alone only gives constant
root discriminant type lower bounds. Odlyzko gives asymptotic constants for totally real fields, not something
like root discriminant  d automatically. But I vaguely remember that minimal discriminants for signature
(n − 2, 1) may grow like nn , i.e. root discriminant polynomial in n. Is that a theorem, or just what happens
in tables?
    There is another
              √      way to make the quadratic extension. If F has a unit with sign pattern (−, +, +, . . . , +),
then K = F ( ε) is complex at exactly one real embedding and real at the others. Since ε is a unit, the finite
relative discriminant should only involve primes over 2 (up to the usual quadratic-extension issues). Thus if
F has bounded root discriminant and such a sparse signature unit, K also has bounded root discriminant.
Full signature rank of units would give the sign pattern. Are there infinite totally real towers with units of
all signatures? Narrow class groups enter here. I cannot just assume it.
    Even if I can make K, the relative regulator may be the whole story. Write

                                                  ρ(d) = log Rrel .

For L = log M , the log number of useful units is roughly

                                                   s log L − ρ(d).

To disprove the Erdős bound with constant C, this needs to dominate
                                                           dL
                                                    C           .
                                                        log(dL)

If s ∼ d/2, optimizing the model gives

                                       s      log(dL) − 1     Cd
                                         ≈ Cd             ≈         ,
                                       L        log(dL)2    log(dL)
so
                                                  s log(dL)    1
                                           L≈               ≈    log d
                                                  d C         2C

                                                         15
in the natural range. For arbitrary large C, one can take d enormous so that this L is still large. If
ρ(d) = O(d), the maximum is positive of order d log log d. Thus an exponential relative regulator is not
enough to save the conjecture. To block the M = d version, one wants something like

                                               Rrel ≳ (log d)d/2 .

Maybe that is true for this special relative unit group?
    General regulator lower bounds that I remember — Zimmert, Friedman — are exponential in degree,         √
not (log d)d , although I may be conflating different statements. Brauer-Siegel says hR is governed by D
asymptotically, but if D has bounded root then that again suggests only exponential total hR, modulo
residues and class number. On the other hand, upper bounds for regulators often contain a (log D)d−1
factor; for D = δ d , that is exp(O(d log d)). So general discriminant control does not force a small regulator.
    Mahler-measure lower bounds do not settle it. A relative norm-one unit has one conjugate on the unit
circle. Dobrowolski gives a tiny lower bound for the height of an individual non-torsion unit; it is far too
weak. I need information about m − 1 independent relative units simultaneously. A lattice packing lower
bound for the log lattice could conceivably give (log d)m , but I √do not know such
                                                                                 √ a theorem.
    Maybe I can explicitly produce the relative units if K = F ( a). Put t = a. For b ∈ F ,

                                                         t−b
                                                  ub =
                                                         t+b
has relative norm 1, because the conjugation over F sends t 7→ −t. But ub is an algebraic integer/unit only
when t + b is a unit, equivalently when

                                            NK/F (t + b) = b2 − a

is a unit. This is a Pell equation over F . Dirichlet says there are m − 1 independent relative units, but it
does not say they arise from small b’s. Their regulator could be huge. √
    Could I take a = ε a sign-pattern unit and get something from t = ε? The element t is itself a unit in
K, but
                                               NK/F (t) = −ε,
not 1. Units coming from F have relative norm squares. Combining ta v gives norm (−ε)a v 2 , so norm one
requires a square-root relation in F . No free rank m − 1 appears that way. The new units exist abstractly,
but they are solutions to a high-dimensional Pell problem.
    This makes the “bounded root discriminant plus sign unit” route much less decisive. Even in an unramified
quadratic extension, the relative regulator can be large if the relative class number/residue terms allow it.
The analytic class number formula does not hand me small fundamental relative units.
    The signature side remains uncertain. Suppose F is in an infinite totally real class field tower. Units
from the base have signatures repeated over fibers, so they cannot isolate one embedding in the extension.
New units may appear, but full signature rank at every level is a strong condition. Narrow class number
equals ordinary class number exactly when signatures are full; perhaps some towers have that, √  perhaps not.
If they did, I could choose ε negative at one real embedding and positive at the rest, form F ( ε), and get
the desired archimedean signature with finite ramification only above 2. But I still would not have small
relative regulator.
    Maybe there is a theorem specifically for one-complex-place fields: regulator at least cd dd/2 , or at least
(log d)r . I recall Remak-type bounds, Friedman’s explicit exponential bound, Zimmert sets. One version in
my memory is much closer to R ≥ c(log(d/2))r for non-CM fields, but I am not sure of the statement. If a
lower bound of that shape applied to the relative regulator, it would exactly cancel the (log M )r count at
M ∼ d. That would explain why this easy-looking construction is not known to beat Erdős. But it would
only control this number-field template, not the full planar problem.
    The classical lower bound gives a comparison. In cyclotomic or Gaussian S-unit language, regulators are
effectively of size exp(cd log d) when degree/rank is allowed to grow by adjoining many primes or roots; then
choosing L of size log d gives no gain. If Rrel ∼ dd , then the count

                                                (log M )s /Rrel


                                                       16
is tiny at M = d. If I choose M much larger, say L = da , then the log degree is ∼ sa log d − d log d, but the
Erdős allowance is now ∼ d da /((a + 1) log d), enormous; no violation. Thus only genuinely small relative
regulator, exp(O(d)) or maybe (log d)o(d) , is dangerous.
     Can I prove a negative result conditionally and then cite existence? I do not know an existence theorem
giving the regulator. Class field theory can give small discriminant extensions, not small relative units.
Conversely, geometry of numbers gives some upper bounds for a system of fundamental units in terms of D,
but for bounded root discriminant they are at best exp(O(d log d)), which is too large for the counterexample.
     What about avoiding algebraic units entirely and proving a general upper bound on Γ ∩ S 1 for a rank-d
additive group Γ ⊂ C? If I take a coeﬀicient box of side T , ST applied to the corresponding point set
says the number of unit translations that preserve a positive proportion is at most T d/3 . But for the Erdős
conjecture, with n = T d , I would need something subexponential in d in the right regime, roughly exp(O(d))
 P T ∼ d. ST only gives exp((d/3) log d), far too weak. Counting integer points on the quadratic equation
when
| ai zi |2 = 1 is also misleading: with rational dependencies it might look like one quadric, but the planar
incidence bound forbids the naive T d−2 behavior in configurations where translations are popular.
     Neither side closes yet. Elementary amplification tricks do not repair the construction.
     Can I take many copies of the standard lattice lower-bound configuration at different scales? If I take k
disjoint copies, N = kn and E = ke. The extra factor E/N is unchanged, while the target N C/ log log N is
no smaller in any useful way. So disjoint union does not amplify the constant.
     Can I compose unit-distance graphs hierarchically, replacing each point by a small copy? Exact unit
length blocks interactions at different scales; if I scale the inner copy, its unit distances are no longer length
one. There is no Euclidean graph product here.
     Can I build dense incidences with two lines or many parallel lines? Two lines distance 1 apart: each point
sees at most two points on the other line. Multiple lines give only the usual lattice-type local degree. Unit
circles centered at P and point-circle incidences are bounded by the congruent-circle geometry; the extremal
point-circle examples with many radii do not immediately specialize to one radius.
     Relaxing r2 = 1 does not remove the regulator bottleneck. Suppose K/F is quadratic over totally real
F , and is complex at c real places and split at m − c, then the relative norm-one rank is m − c. At any one
complex place, every relative norm-one unit still has modulus 1. So I only need m − c proportional to m, not
necessarily c = 1. That is easier for towers: take a totally real tower Fj over a base F0 , √   choose an element
whose signs are negative at a positive fraction of the base embeddings, and form Kj = Fj ( a). The complex
places then have positive proportion, but relative rank also has positive proportion if some real places split.
     However, producing many small relative units is still not automatic. If u is a relative unit in a base
extension K0 /F0 , and I pass to a compositum Kj = K0 Fj , automorphisms of Fj /F0 fix K0 ; they do not
create conjugates of u inside Kj . Automorphisms over Q moving the base embeddings are limited unless I
make everything Galois, and a Galois number field cannot have a mixed archimedean signature of this sort:
it is totally real or totally imaginary in the relevant transitive sense. Taking a compositum of all conjugate
quadratic extensions makes the degree blow up like m2m , destroying the rank/degree ratio.
     So the relative-unit rank promised by Dirichlet remains nonconstructive from the point of view of small
heights. The regulator is the bottleneck over and over.
     Maybe a lower bound for units with prescribed signs is relevant. In a totally real field, a unit negative
at exactly one embedding might need large height, perhaps house at least polynomial in d. Is that true?
A totally real unit with conjugates all in a fixed interval is not obviously impossible; there are totally real
algebraic integers of small house, though units and prescribed signatures are restrictive. But even if the
sign-pattern unit in F is large, it only defines K; the relative norm-one units in K are different objects.
     The class-number formula ratio adds another constraint. For a quadratic K/F ,

                                                     hK R K
                                                     hF R F
is essentially a square-root discriminant ratio times an L(1, χ)-type residue factor and elementary constants.
The relative regulator is comparable to RK /RF up to an index. If the relative discriminant is finite and
small and the root discriminant of F is bounded, the square-root discriminant ratio is exponential in d, but
the L(1, χ) and residue estimates may contribute powers of log D per degree. So relative regulator as large
as exp(d log d) is not excluded by crude analytic bounds. Again, exactly the dangerous gap.



                                                       17
    Could known unit-distance lower bounds already be interpretable through number fields with small
relative regulator? The classical Gaussian construction uses many split primes and S-units; optimizing the
divisor function gives degree factor exp(c log n/ log log n), not exp(d log log d) in the above parametrization.
The regulator/denominator cost is precisely what balances it. That suggests any real construction must pay
a similar cost somewhere.
    For an aﬀirmative proof, maybe one could classify high-rank additive structures by some regulator-like
invariant and prove an abstract lower bound. But the actual unit-distance graph need not lie in a nice
number field module; arbitrary real coordinates can have huge transcendence degree. Incidence geometry
handles the arbitrary case but only gives n4/3 .
    Could rigidity help? A graph with many unit edges has many distance equations. Generic unit frameworks
in the plane have at most 2n − 3 independent constraints; dense unit-distance graphs are highly algebraically
dependent. There are recent rigidity-flavored approaches, but turning “many dependencies” into the exact
Erdős n1+O(1/ log log n) is another matter.
    Counting cycles gives weak bounds. Two vertices in a unit-distance graph have at most two common unit
neighbors, so the graph is K2,3 -free and has O(n3/2 ) edges by Kővári-Sós-Turán. A graph with m edges has
many C4 ’s, and the geometric bound on common neighborhoods improves something, but not to near-linear.
The crossing lemma plus drawing by straight unit segments gives the Szemerédi-Trotter/Székely n4/3 -type
bound. Higher-cycle constraints or rhombus counts might encode more equal-length structure, but I do not
see a path to the logarithmic exponent.
    The fork is concrete. If I could exhibit a sequence of quadratic extensions over totally real fields with
(i) positive relative unit rank, (ii) a distinguished complex place, (iii) enough algebraic integers in small
Minkowski boxes, and (iv) relative regulator exp(O(d)), then the finite planar sets

                         PM = {σ0 (x) : x ∈ OK , |σ(x)| ≤ M for all archimedean σ}

with M ≈ d would appear to have too many unit distances for the Erdős bound. For each relative unit u
with |σi (u)| ≤ M/10, the translation x 7→ x + u contributes  |PM | edges of length one. The number of such
u’s is the relative log-lattice count. The projection is injective. ST does not rule it out.
    But every concrete route to (iv) evaporates. Dirichlet gives rank, not small generators. Sign units define
extensions, not relative norm-one units. Towers give discriminants, not relative regulators, and often do not
give the desired signatures. General regulator estimates are either too weak below or too weak above. So I
cannot turn this into a negative resolution.
    Nor do I see an aﬀirmative argument that would forbid it in the necessary generality. A hypothetical
theorem saying relative regulators in all these mixed-signature quadratic extensions satisfy Rrel ≥ (log d)cd
would only close my number-field loophole, not prove the planar theorem.
    So the number-field construction is a serious stress test rather than a solution. It clarifies the scale:
n ≈ exp(d log d), conjectural extra degree exp(O(d)), ST extra degree exp(O(d log d)), and the tempting
relative-unit count exp(d log log d) sitting strictly between them. Any full proof has to kill phenomena at
exactly that intermediate scale, or any counterexample has to realize them with actual small relative units.
    Either a number-theoretic construction disproves the bound, or a structural argument proves it.
    Relations among directions are one structural possibility. Suppose the unit-distance graph has high
average degree δ. If I orient each edge and label it by a unit complex number, then long walks give sums

                                                 u1 + · · · + uk

of unit directions. There are about nδ k length-k walks but only n2 ordered endpoint pairs, so once δ k  n,
many different walks have the same displacement. In particular, closed walks or collisions give relations

                                      u1 + · · · + uk − v 1 − · · · − v k = 0

among unit complex numbers.
   If the directions were somehow “dissociated,” the graph would expand like a tree and could not live on
only n points. So high average degree should force many short vanishing sums of unit complex numbers.
This points toward Mann’s theorem, the subspace theorem, S-unit equations, maybe results of Schwartz on
unit distances when directions lie in a low-rank multiplicative group. In a multiplicative group of bounded


                                                        18
rank, vanishing sums are very restricted. But here the directions are arbitrary points of the unit circle. A
closed equilateral polygon is not rare: for a long enough polygon there is a continuum of choices of edge
directions summing to zero. So a single relation is not enough. I would need many compatible relations
among a finite set of directions.
    For very short relations there are classification theorems. Conway-Jones type results say that small
vanishing sums of roots of unity have rigid forms; but my directions need not be roots of unity, or even
algebraic a priori. I can at least reduce finite configurations to algebraic coordinates: the coordinates of
the points satisfy polynomial equations with rational coeﬀicients expressing the required unit distances and
inequalities expressing distinctness/nonincidence. If a finite configuration exists over a finitely generated
extension of Q, a generic specialization of the transcendental parameters should preserve the finitely many
unit edges and distinctness. So extremal finite examples may be assumed algebraic. But the degrees and
heights can be enormous, and the unit-equation technology with unbounded degree/rank does not magically
give the Erdős bound.
    The cyclotomic toy model calibrates this. If I take all directions among the sides of a regular q-gon, the
additive group is Z[ζq ], of rank ϕ(q). A box in that group has n ∼ M ϕ(q) points and degree at most about
q. Even for highly composite q, q/ϕ(q) ∼ eγ log log q; this is nowhere near an arbitrary dense unit-distance
graph. It is a useful low-rank direction system, but by itself it does not solve the problem.
    Maybe a compactness or ultralimit argument could help. If the conjectured upper bound failed badly,
could I take larger and larger finite unit-distance graphs and get an infinite unit-distance graph with some
amenability or growth property? But a finite point set with many edges need not approximate a translation-
invariant graph. The directions and local neighborhoods can vary wildly. I do not see a classification target.
    The Fourier-analytic formulation is also seductive but familiar. For the uniform measure µ on P , unit
distances are a discrete spherical average of µ∗ µ̃. Fourier inversion brings in Bessel functions and restriction-
type estimates for the circle. The soft L2 estimates are in the n3/2 world, and the incidence/polynomial
                 4/3
methods
     √ reach n . The elementary polynomial method illustrates the barrier: take a polynomial of degree
d ∼ n vanishing on P ; on a unit circle it has at most 2d zeros unless it contains the circle as a component.
That gives only n3/2 -type information. Partitioning improves this, but not to near-linear.
    The dangerous negative template remains algebraic. Let K be a number field, choose a complex embed-
                                            ×
ding σ0 : K ,→ C, and look at units u ∈ OK     such that

                                                  |σ0 (u)| = 1.

Then σ0 (u) is a unit vector in the plane. If I take a finite set B ⊂ OK and project it by σ0 , then every such
unit u for which many x, x + u ∈ B gives many unit distances.
   A clean version uses Minkowski boxes. Let

                            BR = {x ∈ OK : |σ(x)| ≤ R for every archimedean σ},

with the usual convention over complex conjugate pairs. Heuristically

                                                         Rd
                                                |BR |  p       ,
                                                          |DK |

where d = [K : Q]. If U is a rank-r subgroup of units with |σ0 (u)| = 1, the log-embedding lattice predicts

                                                                         (log R)r
                                 #{u ∈ U : |σ(u)| ≤ R for all σ}                 ,
                                                                            RU
where RU is the relevant regulator/covolume. Each bounded unit translates a positive fraction of a slightly
smaller archimedean box into the larger one, so the projected point set should have about

                                                              (log R)r
                                             ν(PR ) ≳ |PR |
                                                                 RU
edges.



                                                       19
   For a fixed K this is harmless: the extra degree is only a fixed power of log n, and nC/ log log n eventually
dominates every fixed polylogarithm. The danger is a family K = Kd with r  d, small root discriminant,
small regulator, and enough lattice points already visible for modest R. If I could take R ∼ d, then

                                                 log n ∼ d log d

while the number of directions might have logarithm

                                            r log log R ∼ d log log d.

The Erdős allowance has logarithm only
                                                     log n
                                               C             ∼ Cd
                                                   log log n
in that regime. Thus exp(d log log d) directions would beat every fixed C, while still being far below n1/3 ;
it would not contradict the Szemerédi-Trotter n4/3 bound. That is why this number-field route looks so
treacherous.
    Every hypothesis in that paragraph is suspect. First, the lattice-point asymptotic in BR is not uniform
in K. For a varying field, the Minkowski lattice can be skew. The covering    p       radius may be enormous.
Minkowski’s second theorem controls the product of successive minima by |DK |, but some minima may be
very large. If R has to be exp(cd) merely to see a full-dimensional box of algebraic integers, then log n = dRlog
changes, and the apparent gain may disappear. Coeﬀicient boxes in an integral basis are another option, or
zonotopes generated by the directions, but then the coeﬀicients of the units in that basis may be huge. The
geometry-of-numbers issue is not cosmetic.
    Second, the regulator could be exactly large enough to kill the construction. In the dangerous R ∼ d
regime, preventing (log R)r from becoming too big would require relative regulators on the order of something
like (log d)cd in the relevant families. I do not know a theorem of that exact shape. General regulator lower
bounds—Remak, Zimmert, Friedman—give exponential-in-d information, but I need to compare to powers
of log d per dimension. And in special relative-unit groups the behavior could be different.
    Where do I get r  d exact modulus-one units? Generic units do not work: Dirichlet gives a lattice in a
real hyperplane, but the extra equation log |σ0 (u)| = 0 can cut it in a linearly irrational way and leave rank
zero. CM fields do not solve it either. In a CM field, units have essentially the same rank as the totally real
subfield; integral norm-one units are torsion up to finite index. Quotients x/x̄ are modulus-one, but unless
I allow denominators or ideals, they are not a large free group of algebraic integer units.
    The better source is a mixed-signature quadratic extension. Let F be totally real of degree m, and let
K/F be quadratic. If K is complex at one real embedding of F and real at the other m − 1, then K has
signature
                                            r1 = 2(m − 1),     r2 = 1.
Thus
                                                    ×
                                              rank OK = 2m − 2,
while rank OF× = m − 1. The relative norm-one unit group has rank m − 1, and at the unique complex place
a relative norm-one unit has modulus one:

                                         |σ0 (u)|2 = |σ0 (NK/F u)| = 1.

This is the almost-totally-real construction that keeps haunting me.
    Can such fields have small discriminant and small relative regulator? To make a quadratic extension
complex at exactly one real place, I need an element of F with sign pattern (−, +, . . . , +). That is a
strong signature requirement. Units of prescribed signs are governed by narrow class groups and results like
Armitage-Fröhlich; full signature rank is not automatic. Maybe the cost of isolating one embedding is a
large height, hence a large relative discriminant or regulator.
    Fields with one complex place cannot simply sit in an infinite tower: if K has a complex place, any
nontrivial extension has several complex places above it. So the clean bounded-root-discriminant tower idea
fails for signature (d − 2, 1). Totally real towers do exist, but turning each layer into an extension complex
at one chosen embedding may require a sign-isolating element whose norm or height grows badly.


                                                       20
    A positive proportion of complex places changes the signature count. If K/F is quadratic, complex at c
real places and split real at m − c, then

                                      r1 (K) = 2(m − c),       r2 (K) = c,

and the relative unit rank is
                                                     m − c.
If c ≈ m/2, that is still proportional to the degree. A totally real tower Fj and a fixed
                                                                                     √ base element ε whose
negative sign pattern lifts to a fixed proportion of embeddings would give Kj = Fj ( ε) with bounded-looking
relative discriminant and a linear relative rank.
    But then I need many small relative units. A base relative unit in K0 /F0 does not proliferate through
Kj = K0 Fj : automorphisms of Fj /F0 fix F0 , and in the compositum they fix K0 , so they fix that unit.
Automorphisms over Q moving the base embeddings are only the finite symmetries already present at the
bottom. If I force enough Galois symmetry so that conjugates of a unit all lie in Kj , I risk making Kj /Q
Galois; then the
               p archimedean type is uniform, all real or all complex, not the mixed pattern I wanted.
Adjoining all σ(ε) is another escape, but the degree blows up like m2m , while the obvious supply of units
grows only like m. That loses the rank-per-degree advantage.
    So the ATR idea remains conditional. The useful statement would be: if there is a sequence of fields
Kj with a distinguished complex embedding, a rank rj  dj subgroup of σ0 -unimodular units, controlled
log-regulator, controlled root discriminant, and controlled covering radius, then the projected Minkowski
boxes beat the Erdős bound. But that is a stack of hard number-theoretic hypotheses.
    The one-unit version is definitely too weak. Suppose α is an algebraic unit with |σ0 (α)| = 1. Directions
αk are usable only while the other conjugates remain within the archimedean box. If H is the house away
from σ0 , then
                                                         log R
                                                   |k| ≲       .
                                                         log H
Even if Lehmer were false in a favorable way and log H were about 1/d, I get only about d log R powers.
In a d-dimensional additive box, that is on the order of log n, not the exp(d log log d) I would need. Many
independent modulus-one units are essential.
    This also reframes the classical construction. In Q(i), one uses many split primes and S-unit-like quo-
tients, then clears denominators. The number of directions is divisor-function size, exactly exp(O(log n/ log log n)).
Generalizing with more fields or more primes might improve constants, but without controlling denomina-
tors it just inflates the point set. The conjecture is essentially saying that no clever denominator/field
manipulation beats that divisor-function scale by more than the allowed constant.
    On the upper-bound side, maybe there is an additive-combinatorial route. Let A = P ⊂ C, and let
S ⊂ S 1 be a set of popular oriented directions. Suppose each s ∈ S contributes at least t translations:

                                               |A ∩ (A − s)| ≥ t.

Then the number of such oriented edges is t|S|. Put α = t/n. The restricted sumset

                                       A +G S = {a + s : a, a + s ∈ A}

is contained in A, so it has size at most n, even though the bipartite graph has density α between A and S.
    Balog-Szemerédi-Gowers might then produce subsets A0 , S0 with small ordinary sumset A0 + S0 . Plün-
necke would bound kS0 above in terms of n and powers of 1/α. But finite subsets of a strictly convex curve
expand additively; for instance
                                               |S0 + S0 | ≳ |S0 |3/2
is the Elekes-Nathanson-Ruzsa type phenomenon, and iterated sums should grow fast. If the BSG losses
were mild and α were not too small, this would force S, hence the average degree, to be small.
    The problem is the sparse-per-direction regime. A graph may have many directions, each used only
a tiny fraction of the possible n translations. Then α is small and the BSG losses are fatal. Crossing-
lemma arguments handle some of that: if directions are spread out, unit segments cross; if directions are
concentrated, one hopes for additive structure. But the known crossing/incidence machinery stops around
n4/3 .


                                                       21
    The local neighborhood viewpoint gives the same obstruction. A vertex p of high degree has many
neighbors on the circle p + S 1 , hence many directions Sp . If many other vertices shared translations by
many of these same directions, I would get a grid or cube and quickly force many points. Dependent random
choice might find common direction patterns. But neighborhoods of two centers are intersections of two
unit circles with P , hence share at most two points in the wrong representation; the incidence structure is
K2,3 -free, giving only n3/2 without more geometry. Circle-incidence bounds for congruent circles are exactly
the original hard problem in another guise.
    A multiscale clustering argument also looks attractive and then stalls. Partition the plane into tiny cells.
Between two cells whose centers are about unit distance apart, the exact unit-distance relation is a curved
incidence relation. For two points in one tiny cell, their unit circles meet in at most two global points; locally
there is a K2,3 -type restriction. But summing over many cell pairs brings back the usual incidence estimates.
If clusters are replaced by centers, one has to count near-unit distances between clusters, and exact unit
distances inside clusters recurse. I do not see the entropy gain needed for no(1) average degree.
    The quantifiers also matter. A negative resolution only needs counterexamples for arbitrarily large n and
arbitrarily large constants in the exponent; padding with far-away isolated points would not hurt edges, but
it also changes the comparison exponent slightly. There is no loophole in small n or in the sign of log log n.
The aﬀirmative statement is a genuine eventually-for-all-n near-linear bound.
    A concrete gap remains. The relative-unit heuristic keeps producing the right intermediate scale, but
every route to uniform parameters runs into regulators, discriminants, signature constraints, covering radii,
or lack of Galois proliferation. I still do not have either a construction or an obstruction.
    The quantitative target is
                                             ν(n) ≤ n1+O(1/ log log n) .
The lattice / many-representations construction already lives on this scale, so any algebraic counterexample
has to improve the hidden constant rather than merely rebuild the familiar lower bound.
   The constant C in the exponent is allowed to be large, but fixed. The known O(n4/3 ) upper bound does
not imply it, since
                                           n4/3 ≤ n1+C/ log log n
would require C/ log log n ≥ 1/3, impossible for all suﬀiciently large n. So there is no trivial “choose huge
C” escape.
    Could the negative direction be easier because the formulation asks “for all suﬀiciently large” rather than
infinitely many? No: to disprove it I would need, for every C, arbitrarily large examples with more than
n1+C/ log log n unit distances. That would be a super-Erdős construction.
    The basic geometric constraints are clear. The unit distance graph in the plane is K2,3 -free, since two
points have at most two common unit-neighbors. That gives O(n3/2 ). Szemerédi-Trotter / crossing lemma
gives O(n4/3 ). But neither is remotely close to the conjectured near-linear bound.
    A direction-rank approach is tempting: write the plane as C, and every edge is a complex number of
modulus one. If the edge directions lie in a low-rank multiplicative subgroup, then additive-combinatorial
/ unit-equation machinery can bound cycles or count paths. Conversely, if directions are multiplicatively
independent, short vanishing sums should be rare. A cycle in the unit-distance graph gives

                                                  X̀
                                                        ±zj = 0
                                                  j=1

for unit complex directions zj . Mann’s theorem and its variants control irreducible vanishing sums of roots of
unity, and there are analogues for finitely generated multiplicative groups via unit equations. I can imagine
a strategy: high-rank/generic directions force large girth; large girth forces few edges. Low-rank directions
are handled by number theory. Balance the two and maybe get an Erdős-type exponent.
    The obstruction is that arbitrary complex unit directions can satisfy long algebraic relations, and many
cycles can impose complicated constraints. Graph-theoretically, high girth only yields m ≤ n1+1/k if I can
exclude all cycles up to length 2k. A single vanishing sum can define the directions; they need not be
independent in the required sense.
    Rigidity gives another angle. A unit-distance realization with m edges has 2n coordinate parameters and
m length constraints. For m > 2n − 3, generic frameworks are dependent/rigid-ish. But unit-distance-rich


                                                        22
configurations are very nongeneric. Rigidity alone gives linear thresholds, not near-linear maxima, and the
algebraic dependencies it produces are too soft.
     So maybe look for a negative construction. The standard lower bound: take integer lattice points in
a box and count lattice vectors of a fixed norm. If R has many      √ representations as a sum of two squares,
then each lattice point has roughly r2 (R) neighbors at distance R, and after scaling that is unit distance.
Optimize R and box size to get average degree exp(O(log n/ log log n)). To beat the conjecture one needs
more unit directions for the same “ambient cost.”
     Can I use algebraic number fields and hide most coordinates in other embeddings? This is the tempting
cut-and-project idea.
                                                                                                      ×
     Let K be a number field with a distinguished complex embedding σ0 : K → C. If u ∈ OK               satisfies
|σ0 (u)| = 1, then translation by u is a unit-distance translation in the visible plane. The additive group OK
under σ0 is dense when the degree is > 2, but that is allowed: points only have to be distinct.
     If I take a finite chunk

                       A = {x ∈ OK : |σ0 (x)| ≤ L, |σ(x)| ≤ B for other embeddings},

then for every such unit u whose hidden conjugates are  B, most x ∈ A have x + u ∈ A. In the visible
plane these are unit-distance edges.
   The key is to get many units with |σ0 (u)| = 1. CM fields first come to mind, but that fails in the obvious
way. If K is CM over a totally real field F , then relative norm-one units have modulus one at every complex
embedding; however the rank of the relative unit group is
                                       ×
                                 rank OK − rank OF× = (d − 1) − (d − 1) = 0.

Only roots of unity. No good.
   Instead
        √ use an “almost totally real” quadratic extension. Let F be totally real of degree d, and let
K = F ( δ) be quadratic, with δ negative at exactly one real place of F and positive at the other d − 1 real
places. Then K has one complex pair and 2(d − 1) real embeddings. The relative norm-one unit group has
rank                                               
                                   2(d − 1) + 1 − 1 − (d − 1) = d − 1.
At the unique complex place, NK/F (u) = 1 implies

                                                 |σ0 (u)|2 = 1,

so all relative units give visible unit directions. At the split real places their two conjugates are reciprocal.
                                                                                      ×
    This looks alarmingly powerful. Let r = d − 1. Let E = ker(NK/F : OK                 → OF× ). In logarithmic
coordinates at the split real places, E is a lattice Λ ⊂ R . Units with hidden size at most eT are roughly
                                                            r


                                                            Tr
                                                 M (T ) ≈        ,
                                                            Rrel
where Rrel is the relative regulator, ignoring lattice-shape issues.
  For points, use a Minkowski √   box: visible disk radius L, and all hidden real embeddings bounded by B.
The lattice OK has covolume  DK , so
                                                        L2 B 2r
                                                  n≈ √          .
                                                          DK
If B is a little larger than eT , every unit counted above gives about n edges. Thus average degree ≈ M (T ).
    Set L harmless and B = eT . Then heuristically

                                 log n ≈ 2rT,      log M ≈ r log T − log Rrel .

If the regulator and discriminant are only exponential in r, and if the lattice is not horribly skew, I could
choose r and T to get far more than the classical lattice lower bound. For instance, if log Rrel = O(r), then

                                            log M    log T − O(1)
                                                   ≈              .
                                             log n        2T

                                                       23
With T a suﬀiciently large constant this is a positive constant. That would give polynomially many unit
distances per vertex. Even choosing T ∼ log log n and r ∼ log n/ log log n gives an exponent addition with
an extra log log log n floating around:

                                                          log n
                                    log M ∼ r log T ∼             log log log n.
                                                        log log n

That would beat C log n/ log log n for every fixed C.
   This seems too easy. Where is the catch?
   Check the geometry. If σ0 (x) = σ0 (y), since σ0 is an embedding, x = y. So visible points are distinct.
They can be extremely close; no separation hypothesis exists. Translation works:

                                          σ0 (x + u) − σ0 (x) = σ0 (u),

and that has modulus one. Hidden bounds only serve to keep the finite set finite and Følner-like. This is
legitimate.
    For a fixed field, this is just the usual Erdős construction in disguise: r fixed, M is only a power of log n,
hence n1+o(1) . The standard lower bound is obtained by letting the number of prime factors grow. Here I am
letting the degree grow. The cost of degree must enter√    through discriminants,
                                                                           √        regulators, or denominators.
                                                                                                   √
    Try a concrete smallest example. Take √    F = Q( 2), choose δ = 1√− 2. At the embedding 2 7→ +1.414,
δ < 0; at the conjugate embedding, 1 + 2 > 0. Then K = F ( δ) has one complex pair and two real
embeddings, and relative unit rank 1. A solution of the Pell-type equation

                                                  x2 − δy 2 = 1
                                    √
in F gives a relative unit x + y δ. At the complex embedding it lies on the unit circle. Powers give  T
directions of hidden height eT , and a four-dimensional Minkowski box gives n  B 2 visible points in a
bounded disk. That yields n log n-type edges. Fine, not contradictory.
    High degree asks for ATR fields with many small relative units. There are general lower bounds on
regulators: Friedman gives exponential-in-degree lower bounds, not rr . Dobrowolski lower bounds the height
of a single non-torsion algebraic number only by something tiny after multiplying by degree. So those do
not obviously prevent many small units. But the relative regulator lattice could be very skew: determinant
small/medium does not mean many points in a cube of side T unless the successive minima are controlled.
Minkowski’s second theorem relates product of minima to determinant, but one enormous minimum can kill
the count at a given T . Still, if the determinant is merely exponential and all minima are exponential? Then
T must be huge and the construction loses.
    An explicit candidate would use multiquadratic totally real fields, which have many units coming from
                                     √        √
quadratic subfields. Let F = Q( p1 , . . . , pk ), degree d = 2k . Units from the 2k − 1 quadratic subfields
might have full rank up to finite index. Their logarithmic heights are about sums of log pi , i.e. O(k log k) =
O(log d log log d) if I take small primes. But I need relative units in a quadratic extension K/F with exactly
one complex place, not just units of F .
    Can I choose δ ∈ F with sign negative at exactly one embedding and positive at all others? Weak
approximation says yes, but the√height of such a sign-isolating element may be large. If δ is a unit with
prescribed signs, maybe K = F ( δ) has small discriminant. But I still need norm-one units in K. Elements
like                                                      √
                                                      a+ δ
                                                          √
                                                      a− δ
have relative norm one. They are units if a2 − δ is a unit in F and integrality works. Producing many
independent such elements is a strong unit-equation condition. Rare.
   Class field theory suggests another route. If there is a quadratic extension of a totally real F ramified at
only one infinite place and unramified at finite places, then the finite discriminant is tiny. The relative unit
rank is d − 1. The relative regulator might be small if the class number of K is large. The analytic class
number formula gives roughly                  r
                                   hK R K        DK
                                            ∼         L(1, χ) · (constants),
                                    hF R F       DF

                                                        24
so a large class number ratio can absorb discriminant growth and leave a small relative regulator. But again,
small regulator determinant is not enough; I need actual units in a sup-norm box.
    There is also a hard geometric sanity check: the crossing lemma says no planar unit-distance graph has
more than O(n4/3 ) edges. My construction cannot produce average degree M larger than n1/3 . Translated
into the parameters, it imposes
                                                                1
                                            r log T − log Rrel ≲ (2rT )
                                                                3
for any actual family of units/boxes. For constant T this still permits log M linear in r, i.e. a polynomial
improvement over n. So crossing alone would not rule out a disproof of the Erdős bound. It only forbids too
large a constant exponent.
    Maybe these algebraic-number-field constructions are already known to obey a divisor-type bound. For a
fixed finitely generated multiplicative group Γ, unit equations and ESS control additive relations. But here
the rank grows with the field. The standard lattice construction can be viewed as Gaussian integers with
many rational prime factors. My construction is more like a high-degree Z-module projected to one complex
place.
    A simpler additive construction provides a comparison. Pick k arbitrary unit complex numbers z1 , . . . , zk ,
and take all subset sums. Then n = 2k , and edges along the zi give k2k−1 ∼ n log n. To get average degree
M , take a box in the additive group generated by the directions. If the additive rank is D, a Følner box of
side B has size B D . The cost of accommodating many directions is their coeﬀicient size in a chosen Z-basis.
In OK , D = 2d, and Minkowski boxes are a more eﬀicient way to measure this cost.
    What about Salem numbers? A Salem unit has two real conjugates τ, τ −1 and the rest on the unit circle.
If I choose one of the unit-circle embeddings as σ0 , powers of the Salem number give unit directions. But
that is only rank one. More generally, in a field with signature (2r, 1), the full unit log lattice has rank 2r;
imposing log |σ0 (u)| = 0 is one real linear equation. For a generic lattice its intersection with that coordinate
hyperplane has rank 0, not 2r − 1. It is a rational sublattice only when there is a norm relation, such as the
ATR quadratic extension over F . So the relative-unit construction is not optional; it is what forces a large
subgroup to have modulus one at the chosen embedding.
    Could a CM field work if I take a non-relative unit and divide by its conjugate? That would give modulus
one, but may not be an algebraic integer translation. The ATR relative units avoid that complication.
    For any number field K with one unit u of visible modulus one, the infinite set σ0 (OK ) has every vertex
adjacent to all translates by powers um , so infinite degree in the infinite graph. That by itself does not
contradict anything. Infinite locally infinite graphs can have finite subgraphs of small average degree: a star
has huge degree at one vertex but average < 2. But here the underlying additive group is abelian. For any
finite set of unit translations U , I can take a large Følner box in OK for those translations and get average
degree ≈ |U |. The cost is that the box must be large relative to the coeﬀicient sizes / hidden conjugate sizes
of all translations. So the quantitative problem is exactly: how many visible-modulus-one algebraic integer
units can be made simultaneously small in the hidden directions, relative to the number of lattice points
needed to Følnerize them?
    If there exists a finitely generated additive subgroup of C containing infinitely many unit complex num-
bers, then this mechanism gives finite unit-distance graphs of arbitrarily large average degree. Indeed, OK
under σ0 is such a subgroup whenever there is an infinite group of units of visible modulus one. The average
degree can go to infinity. The classical conjecture is only about the rate as a function of n.
    Two possibilities remain. The cycle/vanishing-sum route is conceptually appealing but still qualitative.
The ATR route is formally legitimate and reduces the question to very delicate arithmetic of relative units:
regulator, successive minima, discriminant, and sign-controlled quadratic extensions. If one could find a
sequence with relative unit lattices having many small vectors in boxes, then the cut-and-project construction
would beat the Erdős exponent. No explicit family or proof of the needed small relative units is in hand.
    The basic template is this: if I can find many unit directions inside some finitely generated additive
module, and if the coeﬀicients of those directions in a chosen basis do not grow too fast, then a box in
that module gives a lower bound. The classical example is just the Gaussian rational one. I take many
Pythagorean directions, clear denominators, and work in a scaled copy of Z[i]. But the denominators are
the product of many primes, so the coeﬀicient sizes are already something like exp(M log M ) if I index by
the number of prime factors. More precisely, choose one radius R with many representations as a sum of two
squares. If R is built from the first k primes 1 mod 4, then the number of directions is M = 2k , while the


                                                       25
                         Q
coordinate scale is about pi ∼ exp(k log k). A box in the integer lattice then has n roughly exponential
in k log k — depending on exactly whether I call the radius or its square R, there is a harmless factor 2 —
and therefore
                                                                       
                                      k                          log n
                                M = 2 = exp (log 2 + o(1))                .
                                                              log log n
   That is the usual lower-bound scale.
   The relative-unit idea would need more. Suppose I have a relative unit lattice of rank r. If I take all
                                                       then I get M = 2r unit directions. But the additive
subset products of r small independent relative units, P
coeﬀicients in an integral basis grow roughly like exp( hi ), or at least exp(O(rH)) if the heights are H.
Then the box lives in degree D, and if D ∼ r I get

                                         log n ∼ O(DrH) ∼ O(r2 H),
                              √
   so M = exp(r) is only exp( log n) in the optimistic constant-height case. That is much worse than the
Gaussian divisor construction. In the “hidden Minkowski box” picture I was estimating log n ≈ rT , but for
subset sums/products the needed T itself is about rH, so again r2 H.
   The only way the unit-lattice picture looks tempting is if I count all relative units in a ball. Then
heuristically

                                  log M ≈ r log T − log Rrel ,    log n ≈ 2rT
    or something of that shape. If I could take r large and T small, that might beat the divisor construction.
But I do not know how to make the regulator and the lattice shape cooperate. If independent relative
units necessarily have heights at least exp(cr) or even linear-in-r logarithmic size, the gain evaporates. For
example, if the √  minimal useful T is r log r, then log n ≳ r2 log r and log M ≲ r log r, so log M is only
on the order of log n log log n. If T could be as small as log r, then taking r ∼ log n/ log log n would give
log M ∼ r log log log n, which would actually overshoot the Erdős scale by a log log log n factor. So everything
is in the height/regulator obstruction.
    This obstruction is entangled with deep lower bounds for regulators, heights, and Lehmer-type phenom-
ena. The formulation itself still admits no simpler loophole.
    The statement is standard: distinct points, ordinary Euclidean distance, unordered pairs, all suﬀiciently
large n. No allowance for coincident points. No “infinitely many n” ambiguity. The exponent 1 + C/ log log n
has a positive absolute C. I do not see a syntactic escape.
    Disjoint unions do not amplify a known construction. If I place copies far apart, the number of edges adds
and the number of vertices adds; average degree is a weighted average. It does not turn a fixed lower-bound
constant into an arbitrarily large C.
    Blowing up every point into a cluster also fails. In exact Euclidean unit distance, if I replace a point
by several nearby distinct points, the distances to a neighboring cluster are not all exactly one. The set of
points at unit distance from two fixed points is at most two circle intersections. This is the same obstruction
behind the absence of large K2,t in unit-distance graphs. Parallel lines do not help either: between two
lines, a unit distance fixes the horizontal offset up to sign, so I get matchings, not complete bipartite graphs.
Concentric circles have the same circle-intersection bottleneck.
    An upper-bound route would treat unit distances as incidences between n points and n congruent cir-
cles. The general point-circle incidence theorem gives O(n4/3 ), and arbitrary circles make that sharp, but
congruent circles are special. The conjectured bound is nearly linear. Incidence geometry plus additive com-
binatorics says that too many incidences should force grid-like structure; for unit circles, the only obvious
grid-like structures are the Gaussian rational/Pythagorean ones, where the divisor function appears.
    Making that rigorous is another matter. Suppose the unit-distance graph has average degree D. If
                                                                    
                                                             log n
                                             D = exp K                 ,
                                                           log log n
   then extremal graph theory gives short cycles: the girth is O(log n/ log D) = O(log log n/K). Every cycle
gives a vanishing sum of unit complex numbers, with signs according to orientation. Could short vanishing
sums of unit complex numbers force arithmetic structure? Not in this generality. A quadrilateral cycle


                                                       26
just says I have a rhombus/parallelogram, with continuous parameters. Hexagons also move continuously.
Mann’s theorem is for roots of unity, not arbitrary unit complex numbers. A relation

                                       z1 + · · · + za − za+1 − · · · − z` = 0
    among arbitrary points of the unit circle is just a closed polygon. There are continuous families.
    What about rigidity? A graph with many edges contains rigid subgraphs; unit-distance embeddings of
rigid graphs have coordinates algebraic over a choice of anchors, with finite choices. But the degree and
height can explode exponentially in the size of the rigid component. Flexible components can be grid-like
and have many parallelograms. I do not see a clean bound at the Erdős scale coming from this√alone.
    Function-field Pell equations are tempting. Over F = Q(t), the quadratic extension K = F ( t2 − 1) has
the norm-one unit
                                                        p
                                               u = t + t2 − 1.
    But that gives rank one. To get rank r, maybe use a base field F = Q(θ) with many embeddings
and evaluate Pell-type units at the conjugates. Or use interpolation: prescribe local values at θi , solve
a(θi )2 − δ(θi )b(θi )2 = 1, then interpolate a, b. Over a reducible étale algebra this is easy; over an irreducible
number field it becomes a polynomial Pell congruence modulo the minimal polynomial. But integrality and
denominators become severe. Arbitrary interpolation produces algebraic numbers with denominators like
the discriminant, and multiplying denominators destroys the norm-one property.
    The additive-box construction does not actually require algebraic integers or a ring of integers. It needs
a finitely generated Z-module in C that contains the unit translation vectors. If I have finitely many unit
complex numbers, their additive Z-span is such a module; the point is only its rank and the coeﬀicient sizes.
So the problem can be reframed: how many points of the unit circle can lie in a low-rank additive subgroup
of C, with controlled coordinates in a basis?
    There is folklore here: rank 3 additive subgroups have only finite/interpretable intersections with the
circle, while rank 4 groups can have infinite intersection. For instance, if I take a number field K of degree
2, then points (x, y) ∈ K 2 on x2 + y 2 = 1 give unit complex numbers in a 4-dimensional Q-vector space.
Parametrize by

                                           1 − t2               2t
                                     x=           ,      y=         ,    t ∈ K.
                                           1 + t2            1 + t2
    So fixed rank can give infinitely many directions. But with bounded coeﬀicient height, how many? For a
fixed positive-rank elliptic-curve-like situation one expects only polylogarithmically many rational points of
height ≤ H — more precisely, Mordell-Weil counting gives powers of log H for fixed rank. For the rational
circle over Q, clearing a common denominator returns exactly to the Pythagorean/divisor bound. If I choose
many parameters t, the denominators 1 + t2 vary; the common denominator is their product unless I choose
them from a divisor-rich structure.
    Over a number field K, the same parametrization gives K-rational points on the circle. Directions whose
coordinates lie in Q−1 OK correspond to representations of Q2 by x2 + y 2 over OK . The number of such
representations is controlled by ideal divisors in K(i). For a fixed field, this is again a divisor-function
phenomenon. If the degree varies, maybe the constants change, but the denominator/covolume cost also
changes.
    What if I take direct products of independent constructions? Suppose I rotate several Gaussian rational
lattices by unit complex numbers whose real and imaginary parts are chosen so that the corresponding
additive subgroups are Q-independent. Let G be the direct sum of these rotated scaled lattices. A point is
a sum of components; the map to C is injective if I choose the rotations genericallyQ   enough. If component j
supplies
 P        M j unit directions and has  n j  points  in its box, the product box has n =   nj points and roughly
( Mj )n directed translations. So the average degree adds, not multiplies.
    For equal components, if log n = L, k components, and each component has log N = x = L/k, then
                                                                   x
                                             log D ≈ log k + c         .
                                                                 log x



                                                         27
    The single large component wins asymptotically over the log k gain. Taking many one-dimensional
segments gives a hypercube with n = 2k and average degree k = log n, again much smaller than the divisor
lower bound.
    Could I multiply directions rather than add constructions? Products of unit complex numbers are unit.
Classical Gaussian primes do exactly this: choose many elementary rational unit directions and take all
products; after clearing the product denominator, everything is still in the same rank-two lattice. If I try to
tensor independent rotated copies, the additive rank usually multiplies or explodes. In a fixed number field
it stays finite, and the construction becomes an S-unit construction. The count is again divisor-like.
    The fixed-field S-unit version gives the same scale. Take a quadratic extension E/K with conjugation τ ,
and split prime ideals. Ratios π/τ π have norm one and, at a distinguished complex embedding where τ is
complex conjugation, have modulus one. If I choose R prime ideals, I get 2R ratios. If these primes lie over
the first k rational primes and the degree of K is d, then R ∼ dk, while the norm of the denominator is like
exp(dk log k). So

                                 log M ∼ dk,       denominator cost ∼ dk log k.
      The degree cancels from the main ratio. That is the same Erdős/divisor scale.
      But then a dangerous thought: what if a fixed rational prime, say 2, splits completely in fields of
unbounded degree? Then there are d prime ideals of norm 2. The product denominator has norm 2d , and
the number of sign choices is 2d . That is polynomial rather than divisor-subexponential in the denominator
norm. If I could turn those sign choices into actual principal elements with controlled archimedean size, I
might get average degree that is a power of n, far beyond known constructions. The flaw must be somewhere:
class group, generator heights, hidden embeddings, or the planar projection.
      In a CM-like field E with involution τ , if a prime ideal p and its conjugate τ p are principal, generated by
α and τ α, then u = α/τ α has modulus one at the distinguished embedding. If 2 splits into many such pairs,
subset products give 2d directions. But prime ideals need not be principal. The S-unit group has rank |S|+
unit rank, yet prescribed valuations may be obstructed by the class group; one may need powers equal to
the class number. Passing to a Hilbert class field principalizes ideals but changes degree and discriminant.
Even when principal, a generator of norm 2 can have enormous conjugates at some embeddings. Multiplying
by global units can balance logs only modulo the unit lattice; the regulator and covering radius re-enter.
      Maybe bounded root discriminant towers with a fixed split prime help. Arakelov/Minkowski gives rep-
resentatives with archimedean sizes bounded by a power of the discriminant. If the root discriminant is
bounded and the degree is d, this is exp(O(d)). For d elementary directions, subset products could then have
height exp(O(d2 )). With additive dimension O(d), I would get something like log n = O(d3 ) and log M ∼ d,
only exp((log n)1/3 ). Not enough. I would need much better balanced principal generators.
      The arithmetic route is exactly measuring coeﬀicient height of many unit directions.
      Without the arithmetic, take an arbitrary rank-D additive subgroup L ⊂ C, generated by basis vectors
b1 , . . . , bD . A unit direction corresponds to an integer vector x ∈ ZD satisfying

                                                  X
                                                        xj bj = 1.
                                                    j

   Equivalently, x lies on the level set of the quadratic form

                                            Q(x) = |u · x|2 + |v · x|2 ,
    where u, v are the two real rows of the projection RD → R2 . This quadratic form is positive semidefinite
of real rank 2. If its kernel contained integer vectors, many different coeﬀicient vectors would map to the
same point in C, so that does not give many distinct directions. If the kernel is irrational, the lattice projects
densely.
    Could a rank-two quadratic cylinder contain enormously many integer points on the exact level Q(x) = 1?
For a generic choice of u, v, probably none beyond those imposed. But I can choose u, v. Given M desired
integer vectors xk and M desired unit complex numbers zk , the equations φ(xk ) = zk are linear in the 2D
real coeﬀicients of φ. I can fit at most D complex data freely. To fit M  D, the zk must satisfy the same
additive relations as the xk . So I am back to finding many points on the unit circle with low additive rank.


                                                         28
   There are tempting fake examples. If the map factors through a one-dimensional parameter m and sends
m to ζ m , I get a regular polygon, but m 7→ ζ m is multiplicative in m, not an additive homomorphism. The
additive span of a regular M -gon has rank ϕ(M ), which for highly composite M is at best smaller than M
by a log log M factor. That only gives polylogarithmic average degree if I use coeﬀicient height one.
   Another fake source of abundance is the real kernel. If I choose b3 , . . . , bD almost in the kernel, then there
are many integer vectors whose images lie near the unit circle. But I need exactly on the unit circle, not
near it. If I set the kernel exactly rational, then those integer directions collide in the plane; selecting one
representative removes the apparent multiplicity. Could I perturb the kernel slightly while preserving exact
norm-one for a large chosen set? That becomes a system of many quadratic equations in the few projection
coeﬀicients. Without special structure, impossible. √         √
   For a concrete number-field version, take basis 1, 2, i, i 2. Elements look like
                                                     √           √
                                            z = a + b 2 + i(c + d 2).
   The condition |z| = 1 in the chosen real embedding is
                                                √            √
                                          (a + b 2)2 + (c + d 2)2 = 1.
                                  √
   If I require equality inside Q( 2), I get two equations:

                                   a2 + 2b2 + c2 + 2d2 = 1,        2ab + 2cd = 0,
     so only finitely many integral solutions. If I allow a common denominator H, I am counting representa-
tions of H 2 by this norm form, and the number is again governed by divisors in a degree-four field, not by
the naive three-dimensional volume of a cylinder. The algebraic constraints cut down the count.
     If I choose arbitrary real basis vectors instead of a field basis, there is only the one real quadratic equation.
In dimension D, a level set should have about H D−2 integer points if the form were rational and rank two.
That sounds enormous. But for a rational rank-two form, the kernel is rational, so all those points collapse
to only O(H 2 ) projected points, and on a fixed circle only O(H) or divisor-many distinct directions. For an
irrational form, exact representation of the single value 1 is no longer a free codimension-one lattice problem;
it is a Diophantine equality with irrational coeﬀicients, usually rigid.
     The same obstacle returns. The lower-bound construction is about many unit vectors with low additive
complexity. Rational points on the circle give the Gaussian divisor bound. Number fields and S-units
look like higher-degree versions with hidden height costs. Direct sums only add degrees. Short cycles and
incidences do not immediately force the needed arithmetic structure. And the apparently huge freedom of
arbitrary dense additive subgroups of C disappears once I demand exact intersection with the unit circle and
distinct planar images.
     An almost-kernel does not help. If I have an additive map φ : Zd → C, and there are exact integer
relations k with φ(k) = 0, then I should simply quotient by them; the effective object is the Q-rank of the
subgroup in the plane. So the relevant parameter is not the number of formal coordinates I write down, but
the actual additive rank over Q.
     For arithmetic lattices there are Bombieri-Pila / divisor-function type bounds for rational points on
conics. But for arbitrary real lattices, a circle can contain as many prescribed points as I want if I allow the
rank to be as large as the set: just generate the group by those circle points. The question is what happens
at fixed or slowly growing rank. To put M points of the circle in rank d, there must be M − d rational linear
relations among them. Are there large finite subsets of the circle with many rational linear relations?
     Roots of unity are the first example. A regular N -gon has additive Q-rank ϕ(N ), not N . But the best
ratio is only the classical one:
                                                ϕ(N )/N  1/ log log N
along highly composite N . Thus M is at most about d log log d from this source. If I include all roots of
unity whose orders divide one N , same story: total number N , rank ϕ(N ). Not remotely enough to make a
dense unit-distance graph by itself.
    What about rational parametrizations, or elliptic curves? Rational points on the unit circle are parametrized
by (1 − t2 , 2t)/(1 + t2 ). The usual integer denominator cost brings me back to divisor-type constructions. For
elliptic curves, rational points of height at most H on a rank r curve are roughly a ball in the Mordell-Weil


                                                         29
lattice, so about (log H)r/2 if the regulator is favorable. If there were elliptic curves over Q with arbitrarily
high rank and very small regulator, this could create many circle points in a low-rank additive group. But
unbounded rank over Q is itself open. Over number fields ranks grow more easily, but then the coeﬀicient
field/rank grows too.
    A folklore statement says that a rank-3 subgroup of C meets the unit circle in finitely many points, while
rank 4 can meet it infinitely; in rank 4 the intersection can be identified with rational points on an elliptic
curve. That sounds promising for directions, but again the points are rational points on the elliptic curve,
not automatically integral points in one fixed coeﬀicient box. Denominators matter.
    An upper bound might be forced using multiplicative rank of the directions. Let D be the set of unit
complex numbers occurring as directions, and let Γ be the multiplicative subgroup they generate, modulo
signs. If Γ has rank r, then every cycle of length k in the unit-distance graph gives a vanishing sum

                                         x1 + · · · + xk = 0,    xi ∈ Γ

up to signs/order. Evertse-Schlickewei-Schmidt bounds the number of nondegenerate solutions of a k-term
unit equation by something like
                                           exp((6k)3k (r + 1)).
So if r is small, too many short cycles should be impossible. This is the Schwartz/S-unit-equation philosophy:
if the direction group has rank O(log n) with a small enough constant depending on ε, then the graph has
at most n1+ε edges.
    Can I remove the rank hypothesis? Suppose total rank is huge. Could I randomly choose R generators
and capture a fraction R/r of the edges, apply the low-rank theorem, and optimize? Not so fast: directions
are arbitrary products of generators. A random coordinate subset almost never contains a given direction
unless its support is contained in that subset. Sampling generators does not sample edges linearly.
    Maybe high rank means many distinct directions, and many directions should be geometrically sparse?
For a fixed direction vector v, unordered unit segments p, p + v form a graph of maximum degree 2, so there
are at most n such edges. But m ≤ n|D| is useless when |D| is large. Could crossing arguments exploit many
directions? Crossing lemma gives a lower bound ≳ m3 /n2 on crossings if I draw straight segments. But an
upper bound by pairs of directions is only O(Ev Ew ); no improvement. Unit-distance geometry forbids some
lenses and complete bipartite patterns, but the known Szemerédi-Trotter/Spencer-Szemerédi-Trotter route
stops around n4/3 .
    What about a polynomial method? Make a polynomial vanishing at points with multiplicity, use the
unit-circle equations around each point? This is the standard incidence setup with unit circles, and ar-
bitrary arrangements of congruent circles still allow too many incidences for the naive dimension count.
Fourier/energy language is similar: ν(P ) is a discrete convolution with circle measure, but arbitrary cluster-
ing defeats clean restriction estimates.
    Could I amplify lower-bound configurations by graph products? If I take Cartesian products of unit-
distance graphs and embed them by sums of rotated/scaled copies, the degrees add and the sizes multiply;
iterating gives average degree O(log n), not exponential. A strong product would require |a + b| = 1 for all
a in one direction set and b in another; that forces constant dot products and is impossible except in trivial
cases. Points on one circle only give chords at fixed angular separation, hence cycles. Several concentric
circles give circulant bipartite pieces, but in the plane there is no Lenz construction with all cross distances
one.
    So the benchmark lower bound remains the lattice one. Take integer lattice points in a large square,√and
choose a squared distance m with many representations as a sum of two squares. After scaling by 1/ m,
each point has about r2 (m) unit neighbors. The maximal order is
                                                                            
                                                                     log m
                                     r2 (m) = exp (log 2 + o(1))
                                                                   log log m

along suitable m. With n ∼ R2 and m ≲ R2 , this gives
                                                       
                                                log n
                              ν(P ) ≥ n exp c             = n1+c/ log log n .
                                              log log n


                                                        30
This is the matching scale to keep comparing against. A negative construction would have to beat the
classical lattice/divisor mechanism, not merely recover it in different notation.
    Polynomial and function-field analogues give the next direct checks.
    First, polynomial / function-field analogues. Suppose I take Gaussian polynomial factors Aj (x), and at
a real value T form unit complex numbers
                                                            Aj (T )
                                                uj (T ) =             .
                                                            Aj (T )
For products over subsets I get many directions of modulus one. If Aj (x) = x + iaj with integers aj , then
                                                    Y T + iaj
                                          uS (T ) =            .
                                                       T − iaj
                                                        j∈S
                                                    Q
After multiplying by the common denominator j (T − iaj ), all subset products are polynomials in T of
degree at most k. If T is transcendental, the real and imaginary parts lie in the rank 2(k +1) group generated
by 1, T, . . . , T k and i timesQthose. There are M = 2k directions.
   But the coeﬀicients of (x ± iaj ) involve elementary symmetric functions of the aj . With aj = 1, . . . , k,
their size is
                                                H = exp(O(k log k)).
If I take a coeﬀicient box of side L much larger than H, the point count is roughly n = L2(k+1) . Minimally
this yields
                                             log n = O(k 2 log k)
and average degree 2k = exp(O(k)), i.e.
                                                   p                 
                                          exp O(    log n/ log log n) ,
weaker than the usual divisor construction. So the rational-function trick is too expensive.
    Can I do better by evaluating polynomial-ring factorizations at a fixed small integer? Over Fq [t] one can
have many low-degree irreducible factors; specializing t to a real integer B gives exact integer identities. But
if B is large, denominator cost is degree times log B; if B is fixed, then to get many distinct factors I must
use higher-degree polynomials, and their values are of size B deg . Again the product of values has logarithm
comparable to totalP degree. For instance at X = 2, factors 2 + iaj with aj ≤ k give M = 2k , but common
denominator log ∼      log(a2j + 4) ∼ k log k, exactly the classical optimization.
    What if I choose many polynomial factors with tiny coeﬀicients and evaluate at 2? There are 2D such
polynomials of degree D, but each value is about 2D ; choosing k of them gives log denominator about kD,
while log M ∼ k. If k is as large as 2D , the ratio is still 1/D, i.e. divisor-type.
    Another possibility is to choose roots zj of a small polynomial and use
                                                     T − zj
                                                             .
                                                     T − z̄j
For real T these have modulus one. If the zj are roots of a bounded-height degree-k polynomial, full
elementary symmetric coeﬀicients are small. But subset products are not symmetric. Generically their
coeﬀicients live in the huge splitting field and have additive rank about 2k , destroying the advantage.
   If the roots lie in a cyclic degree-k field, then products of conjugates of a fixed element are elements
                                                                                                      Q of that
same field. This is the number-field S-unit version: choose α with bounded conjugates, take j∈S σ j (α).
There are 2k such elements in additive dimension k. But coeﬀicient height in a fixed integral basis is typically
exponential in k, so with dimension k I again pay log n ∼ k 2 . If I could find units whose logarithmic
embeddings cancel for exponentially
                                √        many subsets, I might improve. For random   √ signs in k dimensions, the
sup norm of subset sums is k log k, so even a balanced subfamily gives T ∼ k and log n ∼ k 3/2 . To get
M = exp(ck) with T = O(log k) or O(1) would require a very small regulator / very dense unit lattice.
   This loops back to relative units. If I had a relative unit group of rank r, with regulator Rrel , then the
number of units in a log box of radius T is heuristically
                                                            Tr
                                                   M≈            ,
                                                            Rrel

                                                        31
and a cut-and-project point set would have

                                  log n ≈ 2rT,      log M ≈ r log T − log Rrel .

If Rrel were merely exp(Cr), then choosing a constant T > eC would already give M = exp(cr), hence a
power-law excess of unit distances. That would be a negative resolution. But is such a relative-unit situation
compatible with having one distinguished complex embedding where the units have modulus 1?
    General number fields can have regulators as small as exp(Cd) in degree d. For relative units one wants a
quadratic extension K/F with, say, one complexified real place and the rest split real, so that norm-one units
have modulus one at that one complex place. Can I build such extensions with bounded  √         root discriminant
and small relative regulator? Take F totally real in a class-field tower and adjoin δ where δ is negative at
one real embedding and positive at all others. But prescribing exactly one negative sign is an issue: units’
signature patterns and the narrow class group intervene. An extension unramified at finite primes with that
infinite ramification corresponds to a narrow class character with a very specific sign. Generic totally real
fields have full unit signature rank, blocking arbitrary sign characters. Ramifying at a bounded finite set
might help, but constructing an infinite family with the right signature and controlled relative regulator is
not immediate. This is not a quick counterexample.                                                √
    There is also the explicit Pell-family idea. Let F = Q(x) be totally real, and K = F ( x2 − 4). The
element                                                  √
                                                    x + x2 − 4
                                               u=
                                                          2
is a norm-one unit; at embeddings with |x| < 2 it lies on the unit circle, and at |x| > 2 it is real. If a degree-d
polynomial for x has exactly one root in (−2, 2), then this gives the desired signature pattern. But it gives
one unit. To get d − 1 independent small relative units, I would need many polynomial Pell solutions or
a Galois/cyclic mechanism. A Galois field with exactly one complex pair is impossible beyond degree two;
non-Galois fields do not provide all conjugate units as elements of the same field. Again the symmetry I
want fights the mixed signature I need.
    So the polynomial construction remains only a weak lower bound, and the regulator/relative-unit con-
struction is a serious arithmetic problem rather than an available object.
    The rank-4 elliptic-curve loophole looks more dangerous at first glance. A rank-4 additive subgroup
Γ = Zω1 + · · · + Zω4 ⊂ C intersects the unit circle in solutions of one quadratic equation in four integer
variables. Projectively, an intersection of two quadrics in P3 is a genus-one curve. Rational points on that
elliptic curve can be infinite, and if the Mordell-Weil rank is r, the number of rational points of height ≤ H
is roughly (log H)r/2 .
    If I could vary the rank r while keeping the ambient additive rank 4, then for curves of rank

                                                         log H
                                                  r
                                                       log log H

I would get (log H)r/2 ≈ H c directions in a rank-4 coeﬀicient box of size H. Then a four-dimensional
generalized progression mapped to the plane would have n ∼ H 4 and polynomially large average degree.
That would be far beyond the Erdős scale.
    But here is the catch: the rational points on the elliptic curve do not correspond to integer coeﬀicient
vectors in the fixed rank-4 lattice. They correspond to projective rational vectors. To turn many of them
into actual translations in one additive lattice, I must clear all their denominators simultaneously. The
common denominator of a large set of rational points can be enormous. On elliptic curves, denominators
of multiples form divisibility sequences and their lcm grows exponentially/quadratically in the range. Thus
the coeﬀicient box side is not the naive height H; after clearing denominators it may have paid for all those
points, just as rational points on the circle pay through the common denominator.
    Could I choose many rational points with a common denominator q? Reduction modulo q has about q
points, but lifting those residue classes to rational points of denominator exactly q is not automatic, and
scaling integral representatives corresponds to integral points on related quadratic intersections or twists.
Siegel-type finiteness and denominator growth re-enter. So the elliptic-rank mirage also runs into common-
denominator cost.



                                                        32
    Every route here either reproduces the divisor-function lower bound, falls below it because the addi-
tive dimension grows, or requires a deep unproved supply of arithmetic objects with very special regula-
tor/denominator behavior.
    The elliptic-curve idea still does not improve by dropping the insistence that the points be rational in a
fixed coordinate system. Suppose I use real points on the curve, and choose an irrational lattice basis tailored
to the finite set. If I have M rational points, their coordinates, relative to some 4-dimensional real basis, are
vectors in Q4 . Multiplying by a common denominator makes them integral. But that common denominator
is exactly the thing that is killing the construction. Can I absorb denominators separately into the basis?
Only coordinatewise. For a genuine lattice, I need all coeﬀicient vectors to be integral in one Z-span. Passing
to a nonstandard basis or doing Smith normal form only replaces the lcm by the index/determinant of the
subgroup generated by those rational coeﬀicient vectors. In the examples I have in mind that determinant
is still essentially the same denominator explosion.
    Maybe torsion? A finite subgroup of an elliptic curve would give many points with shared denominators.
Over Q, Merel kills this; over number fields torsion can be large, but then I have raised the additive dimen-
sion/degree and I pay elsewhere. Also torsion on the elliptic curve is not automatically a set of Euclidean
unit directions in a low-complexity additive group.
    What about modular parametrizations, or intersections of quadrics, producing many integral points
directly? There are elliptic curves with many integral points, and constructions in the Hall-Lang direction,
but the known examples have coeﬀicients and heights enormous compared with the rank. They give exp(cr)
integral points only after the ambient scale has already become exp or worse in r. That balance is lost again.
It might improve lower bounds, but I do not see how it gives the full Erdős exponent, let alone a disproof.
    None of these branches bridges the benchmark gap. Erdős gives the lower bound of order n1+c/ log log n ,
while the general upper bound is still of Szemerédi-Trotter O(n4/3 ) type. Nothing I have touched converts
that gap into a proof.
    The compactness and amenability loopholes can be checked directly.
    For any fixed C, Szemerédi-Trotter is enough up to a finite astronomical range: n4/3 ≤ n1+C/ log log n
while log log n ≤ 3C. The unknown part is the far tail. Could some compactness argument say that if
the Erdős bound fails more and more badly, then there is an infinite unit-distance graph of infinite average
degree, and then derive a contradiction? No, because infinite dense unit-distance graphs exist if I allow
infinitely generated additive groups: take all points in the subgroup generated by a huge/infinite set of unit
directions. Compactness gives no contradiction.
    Maybe the negative direction follows from amenability. Given infinitely many unit generators in R2 , take
a Følner set for the first M generators; then the induced unit-distance graph has average degree almost M .
The whole issue is the size of the Følner set as a function of M . For the rational/Pythagorean unit directions,
the coeﬀicient growth of the generators makes the standard Følner boxes huge and reproduces Erdős’s lower
bound, not more.
    If all those unit directions lived in a fixed Zd with coeﬀicient norm at most H, then a box of side H
would have size roughly H d . If d were fixed and H polynomial in M , I would get a polynomially dense
graph, contradicting Szemerédi-Trotter once M > n1/3 . Thus geometry forbids too many low-height circle
points in fixed rank. Pell-type rank 4 groups only give coeﬀicient norms growing exponentially in the index,
so M ∼ log H. A positive-rank elliptic parametrization gives only polylogarithmically many points up to
coeﬀicient height H. Varying the rank gives more directions but the Følner cost gains new dimensions.
    Could a non-finitely generated abelian group have specially designed Følner sets much smaller than boxes?
For a finite set of generators S, everything lies in the subgroup they generate. If that subgroup has rank
d, the best Følner sets are essentially generalized progressions in the independent directions. Many additive
relations among the directions lower d; otherwise the dimension cost returns. This is just the additive-rank
version of “many points on a circle”.
    Convexity bounds suggest the same tension. Jarník says that a strictly convex curve has few integer
lattice points in terms of length, and on a two-dimensional lattice the circle has at most H o(1) points by
number theory. But in a high-rank dense lattice a convex curve can be forced through many lattice points;
choose arbitrary points on the circle and take their Z-span. Rank matters. Freiman-type statements might
say that a set on a strictly convex curve has additive dimension at least c log |A|, but roots of unity have
dimension about M/ log log M , much larger than logarithmic. Even dimension c log M would not rule out
strong lower bounds, because subset sums already give only polynomial-size ambient sets.


                                                       33
   Try an explicit radical construction. Let
                                                          X
                                                   θS =         θj
                                                          j∈S

and take directions eiθS . The sine/cosine expansion lies in the tensor-product basis generated by the
cos θj , sin θj , so the additive dimension is about 2k , the same as the number of directions. If I force re-
lations by taking θj = 2j θ, then the directions are powers z m , m < 2k . If z is algebraic of degree d ≈ k, high
powers reduce by a recurrence, but the coeﬀicients grow exponentially in m/d, which is catastrophic. If z is
a root of unity of order 2k , then the degree is ϕ(2k ), again essentially the number of directions. Duplication
formulae on elliptic functions look similar: the degrees and coeﬀicients blow up with the number of divisions.
    What about finite fields? Over F2q , the graph joining pairs whose finite-field norm is 1 has n = q 2
vertices and is about q-regular, so it has ∼ q 3 = n3/2 edges. The equations for realizing a finite graph as a
unit-distance graph are polynomial equations with integer coeﬀicients:
                                          (xu − xv )2 + (yu − yv )2 = 1
for every edge. If a graph has a solution over algebraic closures of infinitely many finite fields, Lefschetz-type
reasoning gives a solution over C. So finite-field unit-distance graphs can suggest dense complex “unit-
distance” configurations.
    But this does not transfer to the real Euclidean plane. A complex solution to
                                               (∆z)2 + (∆w)2 = 1
is not the same as two real coordinates. In isotropic coordinates u = z + iw, v = z − iw, the equation is
∆u ∆v = 1. Over R I need v = u; over C u and v are independent. That conjugacy/positivity condition
is exactly what finite fields do not know. If I try p ≡ 3 (mod 4) and imitate conjugation in Fp2 , I get a
polynomial relation like v = up , whose degree varies with p; lifted to characteristic zero it is just v = up , not
complex conjugation. There is no order, no positivity, no real closed field transfer. If such dense finite-field
graphs lifted to real configurations, they would contradict the known n4/3 bound, so the obstruction has to
be real and substantial.
    Hyperbolic or spherical analogues with many finite configurations do not help either; analytic continuation
changes the metric constraint. And the simple “two algebraic curves at unit distance” picture is already
controlled by incidence bounds.
    The number-field √ relative-unit construction needs a closer quantitative check. Suppose F is totally real of
degree d, and K = F ( δ), where δ is negative at exactly one real embedding and positive at the other d − 1.
Then K has exactly one complex place. The relative units of K/F , or units with prescribed norm behavior,
can give complex numbers of modulus 1 at that one complex place. If I had many such units with small
values at all the other embeddings, I could use the full Minkowski embedding to build a cut-and-project
point set; unit directions at the distinguished place, hidden-coordinate translations controlled by the other
embeddings.
    Can I get such K with bounded root discriminant and large degree? Start with a totally real field F
of bounded root discriminant. By a sign-constrained geometry-of-numbers argument, maybe there is an
algebraic integer δ with one negative embedding, all conjugates bounded by a constant, and controlled finite
                                                                         1/2          d/2
valuations. A box in Minkowski space of side B has volume B d ; if DF is only δ0 , then B only needs to
be a suﬀiciently large constant. The sign restriction is not a centrally symmetric convex body, so Minkowski
does not apply directly, but weak approximation plus lattice counting makes the idea plausible. Even better:
if F has a unit with the desired sign pattern, then adjoining its square root only ramifies at primes over 2,
so root discriminants remain bounded in a controlled tower.
    The analytic class number formula then seems tempting. For bounded root discriminant, the crude
inequality
                                                                 1/2
                                              hK RK ≤ C [K:Q] DK
would give RK ≤ exp(O(d)), since hK ≥ 1. The relative regulator should then be at most exponential in
d. If the relative unit lattice had covolume C d and was reasonably round, the number of relative units with
logarithmic sup norm at most T would be about
                                                M ≈ T d / Regrel .


                                                        34
Taking T a large constant bigger than the regulator base would give M = exp(cd) directions, while the
hidden-window cost for translations would be only exp(O(dT )). Then the unit-distance graph would have a
fixed power saving/excess:
                                log n ≈ 2dT,    log M ≈ d log T − log Rrel .
That would be far stronger than Erdős’s lower bound.
   But the flaw is immediate once I look at the lattice shape. A lattice in Rd−1 can have covolume C d and
no nonzero point in a constant cube; the covering radius or the last successive minimum can be enormous.
Minkowski’s second theorem controls the product λ1 · · · λr , not λr . Small determinant alone is useless for
counting points in a fixed cube.
   Can lower bounds on unit heights prevent extreme skew? Dobrowolski gives a lower bound for the Mahler
measure of a non-torsion unit, but in logarithmic embedding this is only polylogarithmically small, not a
constant. If λi ≥ µd with µd roughly an inverse polylogarithm, then the last minimum could still be as large
as
                                              λr ≲ C d /µr−1
                                                          d   ,
which is exponential in d up to polylog factors. If I have to take T = exp(O(d)), then the hidden coordinate
box has size exp(T ), and the construction is hopeless. Even T = O(d log d) gives log n ∼ d2 log d while
log M ∼ d log d, only a square-root type ratio in the exponent.
     Maybe there are stronger results on independent units: Friedman, Remak, Zimmert, regulator lower
bounds. But Lehmer-type constant lower bounds for individual units are unknown, and the known universal
estimates do not give well-roundedness. A regulator upper bound plus a minimal-height lower bound implies
that most successive minima cannot be huge if I choose T = (log d)B ; otherwise the product would exceed
C d . More precisely, many minima are at most a polylogarithm if the lower bound is only a reciprocal polylog.
But independent short vectors are not the same as exponentially many lattice points in the same small cube.
Taking subset sums of εd short units inflates the sup norm to d polylog(d), and then the hidden window cost
returns.
     Could I count lattice points directly in a polylogarithmic cube? Determinant heuristics predict T d /C d =
exp(d(B log log d− O(1))) points. But a skew lattice can defeat this. In two dimensions, the lattice generated
by (, 0) and (0, C/) has determinant C; a small square sees many points in the short direction and none
in the long direction. In high dimension, I can make d − 1 directions huge and one direction tiny while
preserving determinant, subject only to the weak lower bound on how tiny. The count in the cube need not
be exponential in d. So determinant and Dobrowolski do not suﬀice.
     Could I choose fields where the relative unit lattice is forced to be symmetric? If K were Galois, auto-
morphisms would balance the embeddings, but a Galois number field with one complex place and growing
degree is impossible: complex places come in full orbits, and an extension of a base field with a complex place
produces proportionally many complex places. A totally real Galois tower followed by adjoining a square
root with one negative sign breaks the Galois symmetry. The conjugate relative units live in conjugate fields,
not in the one K I am using.
     Maybe a nonnormal field with a large automorphism group fixing the distinguished complex place and
permuting the real split places could work. The stabilizer of one embedding in a transitive Galois closure
can be large. But if too many automorphisms fix the distinguished place, the invariant elements have only
a few conjugate values; making δ have the sign pattern “one special, all others opposite” while keeping a
large internal automorphism group looks very restrictive. I do not see an explicit family, and without such
symmetry I cannot justify the well-rounded relative unit lattice.
     So this number-field route is, at best, a conditional negative statement: if there are almost-totally-real
fields of growing degree whose relative unit lattices have exponentially many points in a bounded logarithmic
window, then one can beat Erdős. But that condition is exactly the hard missing ingredient.
     The quantitative landscape is unchanged. The upper bound remains of Szemerédi-Trotter type, O(n4/3 ),
up to constant refinements. The lower bound is the divisor-function construction giving n1+Θ(1/ log log n) .
None of the sketches above explains the gap between those scales.
     One formal reduction on the upper-bound side is useful. Any finite real unit-distance graph can be
realized with algebraic coordinates. Indeed the realization is an existential first-order formula over Q, using
equations for unit edges, inequalities for distinct vertices and perhaps for nonedges if I want to preserve the



                                                      35
exact graph. The theory of real closed fields gives a solution in the real algebraic closure of Q. So I may
assume all coordinates are algebraic.
    Can I exploit algebraicity in a degree-free way? Probably not. The degree of that algebraic realization
may be doubly exponential in n. A number-field argument with constants depending on the degree is useless.
Still, the unit directions are algebraic numbers on the complex unit circle. Cycles in the graph give vanishing
sums of such unit complex numbers. The Evertse-Schlickewei-Schmidt theorem controls S-unit equations in
a multiplicative group of bounded rank, but here the rank of all directions can be as large as the number of
edges.
    Maybe Galois conjugates of a relation among unit-modulus algebraic numbers force something. A relation

                                              z1 + · · · + zk = 0

at the distinguished embedding becomes, under another embedding, a relation among conjugates whose
absolute values need not be 1. For a three-term unit relation, geometry forces an equilateral triangle, so
ratios are cube roots of unity. For four unit vectors summing to zero, I think the quadrilateral with equal
sides is a rhombus; after reordering the relation decomposes into opposite pairs z, −z. Thus irreducible
length 4 relations do not occur. But length 5 already has continuous families of closed equilateral pentagons;
there are algebraic examples, and no root-of-unity rigidity.
    Graph-theoretically, the simplest cycle count gives only weak bounds. Two points have at most two
common unit-distance neighbors, because two unit circles meet in at most two points. Hence the number of
K2,2 ’s, or 4-cycles, is O(n2 ). On the other hand, a graph with m edges has at least on the order of m4 /n4
4-cycles in the dense regime. Combining these gives roughly m ≤ n3/2 . Szemerédi-Trotter improves this to
n4/3 by using incidences with unit circles. To get anywhere near n1+O(1/ log log n) , one needs control of much
longer even cycles, lenses, repeated distance constraints, or genuine arithmetic structure. The elementary
circle-intersection geometry is far too weak.
    If the average degree were nε with ε = C/ log log n, then those repeated-walk collisions would already
appear at lengths O(log log n). So a counterexample to the proposed bound would give many short vanishing
sums of unit vectors.
    But that does not immediately become a theorem. For a fixed small length there are finitely many
combinatorial patterns for a polygon, but the angles are continuous. I would need some statement that
irreducible unit polygon relations of length k are too scarce unless the directions come from the usual
rational-circle / lattice type structures. That sounds like exactly the hidden core of the problem. Dense
unit-distance graphs have many independent cycles; maybe those cycles force algebraic dependence among
directions; maybe the only way out is a lattice. But I do not see a classification theorem at that level.
    The rigidity viewpoint says something similar in different language. A graph with n vertices and m
edges, all constrained to have length 1, is a framework with m equations. Generically the rigidity rank is
at most 2n − 3. So if m  n, the realization is violently nongeneric: many of the length constraints must
be dependent. Laman circuits and Cayley-Menger type equations should appear everywhere. Could one
prove a universal sparsity statement from the rigidity matroid plus the extra fact that all bar lengths are
equal? That is essentially the “unit distances via rigidity” dream. The triangular lattice already shows many
dependencies with only linear edges; the large lattice lower bound is even more special, with many directions
at one chosen distance. The rigidity count alone does not see the divisor-function phenomenon.
    Polynomial partitioning also seems to stall at the known place. Partition the plane into cells; a unit edge
is an incidence between a point and a translate of the unit circle. With an r-degree partition polynomial
one controls incidences cell by cell and on the zero set. Optimizing gives the Szemerédi-Trotter/Spencer-
Szemerédi-Trotter n4/3 -type bound. To improve it, one would have to exploit that all circles are translates of
the same circle, perhaps by Fourier decay or by additive energy of the cell centers. I do not know a black-box
incidence theorem that extracts the nO(1/ log log n) factor from congruence alone.
    Maybe one can amplify lower bounds by overlaying constructions. Take several rotated or scaled lattice
constructions and arrange that they share the same point set, so the degrees add while the number of points
does not. For disjoint unions this obviously does nothing. If two rational lattices are commensurable after
rotation, their common refinement is a finer lattice; the denominators multiply. The classical Gaussian-
integer construction is already the operation of taking many rational directions of the same length and
paying the lcm/denominator cost. Adding a second denominator seems to be swallowed by the same divisor-


                                                      36
function accounting. I do not see a way to make the point set size submultiplicative while the list of unit
directions is multiplicative.
    Nor is there a recursive cluster trick. If I put a dense graph inside a tiny disk, there are no internal unit
distances. If I put copies at mutual unit distance, I am just building a Cayley graph on translations; the
useful data are again the set of unit direction vectors. Gluing Moser-spindle-type gadgets gives bounded
average degree. The fixed unit length forbids the usual multiscale amplification.
    The lower bound I am trying to beat is n1+Ω(1/ log log n) . Written out, the extra factor is

                                            exp(Ω(log n/ log log n)).
                                                                                                   √
That is already enormous compared with all the polynomial/function-field toys that give only exp(O( log n))-
type gains, or worse. To disprove the Erdős form one needs either the same order with an unbounded constant
or something genuinely larger than log n/ log log n in the exponent. That is a very high bar.
    An aﬀirmative route might pass through the following intermediate statement: if A is a proper symmetric
generalized arithmetic progression in R2 of size n, then

                                   |(A − A) ∩ S 1 | ≤ exp(C log n/ log log n),

uniformly in the rank. Then a Cayley-type unit-distance graph would have at most that many directions
per vertex. But a general dense unit-distance graph need not have its vertices in a small-doubling set. Does
many unit edges imply additive structure of P ? Counting two-step paths gives about nD2 paths. For two
endpoints there are at most two√common neighbors, since two unit circles meet in at most two points, so
this only gives the trivial D ≲ n. Longer paths produce additive relations among unit directions, but
converting that to Balog-Szemerédi structure is exactly the diﬀiculty.
    The entropy version makes the threshold explicit. The number of walks of length k is at least nDk .
There are only n2 endpoint pairs. If Dk  n, many pairs are connected by many walks, and subtracting
two walks yields a closed polygon relation of length at most 2k. At the Erdős threshold, with L = log n and
` = log log n,
                                               D = exp(CL/`),
so k ≈ `/C is enough to make Dk ≈ n. Thus one only needs to understand additive relations among
O(log log n) unit vectors. For a generic set of directions there are essentially none. For rational points
on the circle there are many, but their number is governed by divisor bounds. So the desired theorem is
morally a classification of short additive relations on the circle under large multiplicity. I do not have such
a classification.
    There is also the algebraic-group temptation. Parametrize the unit circle rationally; multiplicative struc-
ture on complex numbers of modulus one interacts with additive relations in the plane. Theorems like
Mordell-Lang for tori, or the Evertse-Schlickewei-Schmidt bounds for S-unit equations, control relations
inside a fixed finitely generated multiplicative group. But here the rank of the group of directions may be
large. Many short graph cycles might lower the rank, but how to quantify that? If I choose a spanning
tree, every chord gives a relation involving the chord direction and all tree directions along the path. In a
graph of high average degree, a BFS tree gives paths of length O(log n/ log D), again O(log log n). There
are m − n + 1 such cycle equations. But the tree already has n independent directions available, so the rank
bound obtained this way is useless for applying S-unit theorems.
    Likewise with angle variables. Give every oriented edge an angle. Vertex closure imposes two real
equations per independent cycle. Naively the angle variety has dimension m − 2(m − n + 1) = 2n − m + 2,
negative if m > 2n, so equations must be dependent. But dense unit-distance frameworks live in special
components of that variety. Counting components or dimensions has not given me an upper bound.
    The standard upper- and lower-bound mechanisms still leave a wide quantitative gap here, so a negative
construction would have to exploit that gap rather than push either classical argument only slightly further.
    What about non-Archimedean real closed fields? If I could realize a finite-field-like dense unit-distance
graph over a real closed extension, then by Tarski transfer the same finite system of polynomial equations
and inequalities would have a realization in R. So any exact construction over Puiseux series would be a real
construction. Can infinitesimals simulate extra Euclidean dimensions? Write coordinates as formal series;
the equation
                                               (dx)2 + (dy)2 = 1


                                                       37
                                                                                           q
holds coeﬀicient by coeﬀicient. One can make many unit directions uj = (1 + itj )/             1 + t2j with tj = εj ,
all infinitesimally close to 1. Products have distinct infinitesimal angles. But to turn 2k such directions
into many edges, I still need them in a low-rank additive lattice. The exact algebraic functions introduce
square roots and higher powers; there are no nilpotents in a real closed field, so the binomial expansions do
not truncate. This collapses back to the polynomial/rational-function construction with huge coeﬀicient or
degree cost. Characteristic p Frobenius miracles do not lift to exact real equations.
    Maybe sparse high-girth graphs? A tree of arbitrary degree is easy to realize as a unit-distance graph:
put all children on the unit circle around a parent, avoiding coincidences. But trees have only n − 1 edges.
For a D-regular graph with many cycles, each cycle has two closure equations and only one angle variable
per edge; for D > 2 the count is overdetermined. Special choices may realize some graphs, but not arbitrary
finite-field expanders.
    The incidence perspective with stars is useful. Unit distances are incidences between centers and points
on their unit circles. A point may lie on many unit circles if many centers lie on a unit circle around it; so stars
are allowed. But two centers share at most two neighbors. Thus the incidence graph is K2,3 -free. Extremal
graph theory would allow n3/2 , and point-circle incidence gives n4/3 , but the congruent-circle geometry is
much more rigid. Could I realize a projective-plane-like incidence design by arranging unit circles so each
pair of “neighbor” points determines a center? If many leaves lie on one unit circle, that gives one center
connected to all of them. A second center shares at most two of those leaves. The design intuition collapses
geometrically.
    Try algebraic curves. Put one part on a curve C(t), the other on D(s), and solve

                                               kC(t) − D(s)k2 = 1.

If this polynomial relation factors into an additive or multiplicative group law, grids could give many in-
cidences. For two lines or circles the answer is only linear: chord length one fixes a bounded number of
parameter differences. For a line and a parabola it is quadratic in one variable. Fixed bounded-degree
curves will not give superlinear unit distances unless there is a special correspondence, and then each point
has bounded partners. Many curves return to incidence theory.
    For Cartesian products P = A × B, the count is
                                               X
                                                     rA (x)rB (y).
                                                x2 +y 2 =1

An arithmetic progression gives the usual lattice representation problem. A high-rank subset-sum set A has
many popular differences, but then B must have matching differences so that the pairs lie exactly on the
circle. This is again the question of how many circle points lie in a product of one-dimensional difference
sets, or in a GAP. Taking angles θS and considering (cos θS , sin θS ) does not make the coordinate differences
into subset sums.
     Semi-algebraic graph extremal theory also stops too early. Unit-distance graphs are constant-complexity
semi-algebraic graphs in R2 . General Ks,t -free semi-algebraic graphs have the n4/3 -type bounds in this
dimension, and those bounds are sharp for more flexible families. The extra fact “translates of one strictly
convex curve” is the missing input. There are structural results about incidences with translates and additive
structure, but I do not know an iteration that reaches n1+O(1/ log log n) .
     The lower-bound constant deserves a closer look. A negative answer does not require a factor exp(ω(log n/ log log n));
it is enough to get the same order with arbitrarily large constants:

                                           n1+cj / log log n ,    cj → ∞.

Can number fields of increasing degree do that? In a fixed CM or Gaussian-type S-unit construction, if a
rational prime splits into d relevant prime ideals, the number of sign choices per rational prime is 2d , but
the denominator norm costs pd . The d cancels in the ratio. Hidden embeddings usually add more cost. So
simply increasing the degree of a fixed-field S-unit lattice does not improve the classical divisor constant.
     Relative units were another hope. In a degree D field, units of logarithmic height at most T are roughly
T r /R. If I could use their phases as unit directions while paying point-set size only exp(DT ), then in the
dangerous regime T polynomial or even constant in D, the number of directions could be exp(D log T ).


                                                             38
Regulator lower bounds of Friedman-Zimmert type are exponential in D, not (log D)D . So at the level of
crude regulators, there might be room for too many small units. But turning arbitrary units into planar
unit directions in a common low-degree additive module is not straightforward.
    For a general number field L with a complex embedding, I can normalize a unit  to phase σ0 ()/|σ0 ()|.
Algebraically, a cleaner object is /ρ(), where ρ is complex conjugation in a normal closure. This has
modulus one at the chosen embedding, but it lives in the compositum Lρ(L), degree possibly D2 or worse.
That quadratic degree overhead kills the entropy. If L is CM and ρ is an automorphism of L, then /¯        is a
relative unit; for ordinary units in a CM field the archimedean moduli are all one only in the quotient, but
the relative unit group is essentially finite when comparing to the totally real subfield? In any case, the easy
arbitrary-unit construction is not giving a planar lattice for free.
    A cleaner CM S-unit source is available. In a CM field K, for any element α,

                                                    u = α/ᾱ

has modulus 1 under every complex embedding, because σ(ᾱ) = σ(α). Thus there is no hidden archimedean
blowup. The only cost is finite denominators. In K = F (i), take α = a + i. If α has many controllable prime
ideal factors, then quotients αS /ᾱS give many unit directions with all conjugates on the unit circle.
    Naively, choose a rational prime p ≡ 1 (mod 4) that splits completely in F . Over K = F (i) it splits
into many conjugate pairs. If for each prime ideal over p I had a principal generator αj of norm p, then
uj = αj /ᾱj would be a unit direction with denominator only the conjugate prime. Taking all subset products
would give 2d directions for denominator norm pd . For fixed p, that is polynomially many directions in the
denominator, much stronger than the divisor-function lower bound.
    But the word “if” hides the class group and the size of generators. CRT can give an a with a ≡ i
modulo a chosen prime, so a + i is divisible by it, but a2 + 1 may have enormous additional factors. Even if
representatives have bounded archimedean size, doing this separately for d primes gives d elements each of
                                                           2
norm C d ; the product denominator then has norm C d , and the advantage vanishes. What I really need is a
single small element, like the rational integer p, whose factorization contains all the primes, and then I need
the individual prime ideals or their subset products to be principal with generators. That is a class group
condition.
    Suppose optimistically that K is a high-degree CM field in which a fixed rational prime p splits completely
into principal prime ideals. Then the construction is frightening. Let A be the product of one prime from
each conjugate pair. Its norm is pd . The fractional ideal A−1 OK contains  p      all the subset ratio directions.
In a Minkowski cylinder, the lattice-point count is volume times pd / |DK |. The directions have hidden
modulus one. By taking the visible disk large enough I can make a planar point set with about pd points,
and about 2d unit translations per interior point. If p = 2 or 5, this would even exceed the n4/3 barrier, so
such a family cannot coexist with the known incidence theorem in the naive quantitative form. For larger
fixed p, the exponent log 2/ log p is below 1/3 but still a fixed power, which would already refute the Erdős
bound.
    So the existence question is the obstruction. Are there infinitely many CM fields of growing degree where
a fixed small prime splits completely into principal primes and the root discriminant is controlled enough?
Principal splitting means the prime splits completely in the Hilbert class field. In a Hilbert class field tower,
a prime that is principal in one level splits completely in the next. Class field tower constructions can
prescribe primes that split completely through the tower. If a base prime splits completely all the way in an
infinite unramified tower, then at each level it is decomposed into many degree-one primes; whether each is
principal in that level is equivalent to splitting in the full Hilbert class field of that level, not merely in the
next chosen subextension. Still, the class-field-tower viewpoint is exactly where this principal-prime fantasy
would have to be tested.
    The subtlety is that splitting in one chosen subextension is weaker than splitting in the full Hilbert class
field of Kn . If L actually contains that Hilbert class field, then a prime splitting completely in L is principal.
So, in an infinite Hilbert class field tower, a prime splitting completely in the whole union is principal at every
finite level. I think there are Golod-Shafarevich-type constructions with prescribed primes split completely,
but the exact consequence is still unclear. The CM geometry is the clean part.
    Take Kn to be a CM field, degree 2d, so that complex conjugation x 7→ x̄ is an automorphism and every
embedding comes in a conjugate pair. Then elements of the form α/ᾱ have modulus 1 at every complex
embedding. Suppose a rational prime p splits completely in K, and suppose for the moment that all the


                                                        39
prime ideals above it are principal. The 2d primes above p are paired by conjugation. Choose one prime Pj
from each pair (Pj , P̄j ).
   If Pj = (αj ), then every sign choice gives me a unit direction
                                                          Y αj
                                                   uS =               .
                                                                ᾱj
                                                          j∈S

At every embedding |σ(uS )| = 1. Also these directions have a common finite denominator. More invariantly,
take                                                 Y
                                                A=      P̄j .
                                                           j

For a subset S, set                                Y           Y          
                                            IS =          Pj              P̄j .
                                                    j∈S          ∈S
                                                                j/

If βS generates IS , and β∅ generates A, then in the explicit principal-prime situation uS = βS /β∅ is the same
product above. Thus uS ∈ β∅−1 OK . The denominator ideal has norm pd , not p2d , in this first version.
    A planar point set comes from a finite chunk of this fractional ideal. Let

                                                   L = β∅−1 OK

inside the Minkowski space Cd . Under a distinguished embedding σ0 , each uS has Euclidean length 1 in the
plane. If I take a box
                                      {x ∈ L : |σi (x)| ≤ R for all i},
then translating by uS only moves each hidden coordinate by modulus 1. For large enough R, most points
remain in the box. The expected size is roughly
                                                                             d
                                                  pd                 R2 p
                                         n ≈ R2d √    =
                                                   DK               rd(K)

up to the usual π-type constants, and the number of directions is M = 2d . So the edge count would be
about M n, and the extra exponent is
                                          d log 2             log 2
                                                       =                  .
                                    d log(R2 p/ rd(K))   log(R2 p/ rd(K))

If this denominator is too small I would even run into the known n4/3 -type ceiling, but I could take R larger
and make the exponent a smaller positive constant. A positive constant would already be enough for a
negative answer to the Erdős bound.
    But the principal-prime hypothesis is exactly where the trap is. An unramified tower in which a set S of
primes is decomposed completely is not necessarily a tower of full Hilbert class fields. If a prime over p splits
in the chosen subextension, that does not say it splits in the full Hilbert class field of the current layer, and
hence does not say it is principal there. Starting with a principal prime in K, it splits completely in HK ;
but the individual primes above it in HK need not themselves be principal. The principal ideal theorem
principalizes ideals after extension as products; it does not tell me that each split factor is principal.
    Maybe I do not need each individual prime ideal principal. For sign choices , let
                                                    Y  1−
                                              I =     Pj j P̄j j .
                                                     j

The class of I lies in the class group. If many sign choices land in the trivial class, then I get many α with
(α ) = I , and then
                                                   u = α /ᾱ
has modulus 1 everywhere.


                                                          40
    What if I only know two sign ideals have the same class? Then I Iη−1 = (u) is principal. At first sight
this looks enough, but it is not the same. The ideal quotient is anti-invariant under conjugation, so uū has
trivial ideal and is a unit in the real subfield. It need not be 1. I would need to multiply by a unit v with

                                                  vv̄ = (uū)−1 ,

i.e. solve a norm equation for a totally positive unit. That is not automatic. Without it, the archimedean
moduli of u vary. Normalizing u at the distinguished embedding by a real scalar would destroy the common
algebraic lattice and common denominator. So the relevant sign choices are those whose ideals themselves
are principal, not merely ratios lying in the same ideal class.
    A tempting first count uses pigeonhole directly on principal sign ideals. The sign classes form a finite
subset of the class group, and the desired conclusion would be that the identity fibre has size at least 2N /hK ,
where N is the number of conjugate prime pairs being used. If one rational split prime gives N = d, several
rational split primes p1 , . . . , pk give N = kd. Under that tentative identity-fibre heuristic, the number of
principal sign ideals would be at least
                                                     2kd /hK .
For each principal sign ideal I , choose α , and take α /ᾱ . These all have modulus 1 at all embeddings.
    This principal-class count is still provisional. Pigeonhole certainly gives a large class fibre, but it is not
yet clear that it controls the identity fibre.                                                          Qk
    Under that provisional principal-fibre picture, the common denominator changes slightly. If q = `=1 p` ,
then q(α /ᾱ ) ∈ OK : at each prime above p` , the valuation of the ratio is ±1, and multiplying by √ p` shifts
the valuations to 0 or 2. So all directions lie in q −1 OK . The fractional lattice now has covolume DK /q 2d .
The point count in a radius-R product of discs is on the scale
                                                       2 2 d
                                                         R q
                                                 n≈                .
                                                        rd(K)
The direction entropy is
                                           log M ≳ kd log 2 − log hK .
If log hK is only Hd, choosing k with k log 2 > H would leave a positive entropy margin. But the primes
must split completely through the tower, and q enters the denominator of the construction.
    The fields also matter. There are class field tower theorems with prescribed splitting of finitely many
primes: for a suitable base field, the maximal unramified extension in which S splits completely can be
infinite. CM fields are also needed. Starting with an imaginary quadratic or more general CM field and
taking an unramified tower stable under conjugation should leave finite Galois layers CM. The Hilbert class
field of an imaginary quadratic field is often described in this direction; more generally, the Hilbert class field
of a CM field may retain CM structure. For a nonabelian unramified tower, one would need conjugation-
stable normal subextensions so that the involution persists. This remains a condition rather than a free
input.
    There is another possible obstruction: lattice shape. Counting lattice points in a fixed product of discs
by determinant alone ignores skewness. The Minkowski lattice q −1 OK can be badly skew. Its determinant
per degree is controlled by the root discriminant and by q, but the largest successive minimum with respect
to the sup norm could be exponential in d. If R = C d were required just to see the volume, then log n would
become O(d2 ), and an exponential number of directions exp(cd) would no longer give a fixed power.
    Translation averaging avoids a well-roundedness assumption. Let Λ be the Minkowski lattice and Ω the
product of discs of radius R. For a translate t + Ω,

                                                Xt = Λ ∩ (t + Ω).

Averaging over t modulo Λ gives
                                                        vol Ω
                                                 E|Xt | =     .
                                                        det Λ
For a fixed lattice translation u ∈ Λ, the number of ordered pairs x, x + u ∈ Xt has average
                                                vol(Ω ∩ (Ω − u))
                                                                 .
                                                     det Λ

                                                        41
If all hidden coordinates of u have modulus 1, this overlap is adR , where aR is the area of overlap of two
radius-R discs whose centers are distance 1. So after summing over a set U of directions, the average number
of oriented edges is
                                                       ad
                                                  |U | R .
                                                      det Λ
The average number of points is
                                                   (πR2 )d
                                                           .
                                                    det Λ
Thus the edge/point ratio carries an exponential penalty
                                                        a    d
                                                         R
                                                |U |               .
                                                        πR2
The direction entropy must beat this cdR boundary/overlap loss. Since cR → 1 as R → ∞, R can be
chosen large after the entropy margin is known. No lattice-shape assumption is needed for the average. The
projection to the plane is also injective because σ0 : K → C is an embedding.
    This yields a useful general lemma: if K is CM, U ⊂ q −1 OK consists of elements with |σ(u)| = 1 at
every embedding, and |U | is exponential√in d, then a cut-and-project set from a product of discs gives many
unit distances, with size controlled by DK /q 2d and with an overlap factor cdR . The elements v = qu are
algebraic integers with all conjugates of modulus q, i.e. q-Weil numbers in K. The sign-ideal construction is
exactly producing many such Weil numbers.
    The familiar cyclotomic construction fits this template. Take K = Q(ζm ), a CM field with d = ϕ(m)/2.
If p ≡ 1 (mod m), then p splits completely, and prime ideals over p are generated by conjugates of ζm − a
when a has order m mod p. The ratios
                                                    ζmj
                                                        −a
                                                    −j
                                                   ζm  −a
have modulus 1 in every embedding. Sign products give 2d directions. But the smallest such p is roughly
polynomial in m at best; certainly log p is on the order of log d in the usual lower-bound optimization. Then

                                  log n ∼ 2d log p ∼ d log d,          log M ∼ d,

which is exactly the classical n exp(c log n/ log log n) scale. So the lemma recovers the standard lower bound.
    To beat that, bounded root discriminant and fixed q, or at least log q = O(1), would be needed while
retaining exponentially many q-Weil numbers. Class field towers with split primes look like the natural
source. The class group penalty is then central. In a bounded-root-discriminant tower, class numbers can
themselves grow exponentially. Brauer-Siegel heuristics give something like log h proportional to d, modified
by regulators and residues. If hK has exponential base larger than 2k , the identity fibre of sign ideals may
be tiny or empty beyond the trivial guaranteed subgroup calculation.
    The number of split primes cannot be enlarged for free. Requiring many rational primes to split com-
pletely in an infinite unramified tower is constrained. Golod-Shafarevich with decomposition conditions
has a cost for every prescribed prime. In the asymptotic theory of number field towers there is also an
Ihara/Tsfasman-Vladut type basic inequality: completely split small primes contribute positive terms, and
the total contribution is bounded in terms of the root discriminant. Finitely many favorable split primes
may be available, perhaps many if the base field has enough class group generator rank, but the primes enter
q, and log q enters log n.
    There is a related function-field picture. In a tower of curves over a finite field with many rational
places, Riemann-Roch produces functions with prescribed zero/pole patterns at those rational places once
one pays a genus-sized auxiliary divisor. That would give 2N functions with denominator degree N + g. In
number fields, an Arakelov Riemann-Roch statement might produce elements with prescribed finite divisors
and controlled archimedean components. But for unit directions the special form α/ᾱ already makes the
archimedean modulus 1; the height of α itself does not enter the translation vector. The finite denominator
q and the field discriminant enter. This makes the analogy more plausible.
    The arithmetic of principal sign ideals is the analogue of the Riemann-Roch dimension. In function fields,
the class group/Jacobian obstruction is overcome by allowing a pole divisor of degree about the genus. In


                                                        42
the number-field sign construction, the class group obstruction appears as the factor hK . Allowing extra
primes in a common denominator could principalize more sign divisors; that is exactly paying more in q.
The balance may be governed by the same basic inequality and may collapse back to the Erdős scale.
   The same-class idea changes this point. Suppose a large fibre of sign ideals lies in one class C, not
necessarily the identity. Choose a base ideal B in the inverse class and multiply all of them by B to make
them principal:
                                                I B = (α ).
The direction
                                                       α /ᾱ
has finite divisor
                                                    I B/(I¯ B̄).
This introduces the fixed denominator from B̄ as well. If B can be kept fixed inside one large fibre, the class
group chooses the fibre, while all directions are measured relative to one base ideal in that fibre. That is the
missing ingredient in the principal-class count, though the details still need care.
    Explicit imaginary quadratic class field towers illustrate the issue. Suppose a base imaginary quadratic
field has an infinite 2-class tower, and a rational prime p split in the base is forced to split in the tower.
At level Kj , p splits into 2dj primes. Sign ideals give 2dj classes. The class group of Kj is large if the
tower continues; indeed its 2-rank may be positive at every level. The number of principal sign choices could
easily be only subexponential. There is no contradiction with the splitting condition, because splitting in
the chosen pro-2 extension is weaker than being principal in the full Hilbert class field of Kj .
    Fixed-q Weil numbers give another formulation. Honda-Tate-type considerations say these are special
algebraic integers. There are finitely many possible polynomials with all roots on the circle of radius q; a
                                            2
crude coeﬀicient bound is huge, like q O(d ) , so it does not rule out exponential families. But in a tower,
the ideal factorization count says the number is controlled by sign choices that become principal. There
may be a theorem that along asymptotically good CM towers, the number of fixed-q Weil numbers is only
subexponential unless q grows. I do not know such a theorem offhand, but class field theory plus the basic
inequality is the natural source.
    The geometric side now seems less likely to be the fatal flaw. Even if the lattice has exponential covering
radius, the translate-average construction gives the right number of cut points and cut edges. After averaging,
a single translate must have both many edges and not too many points. The expectation gives both scales; a
Markov/selection argument or a packing upper bound in the product of discs should control the point count.
Since the region is bounded in every embedding, the number of algebraic numbers in it can be bounded
by a coeﬀicient/packing estimate of the form (CRq)2d , so a translate with large edge count will not have
astronomically many points. In the average formulation, typically the point count is already of the expected
exponential order for many translates. This is not the main obstruction.
    The class-number balance can be written directly. For a CM field K of degree 2d, discriminant ∆, and
k completely split rational primes with product q, the provisional principal-sign count gives

                                                 M ≥ 2kd /hK .

The cut-and-project point count has logarithm roughly

                                         log n ≈ d log(πR2 q 2 / rd(K)).

Edges are roughly n M cdR . Thus one needs

                                                    1
                                        k log 2 −     log hK + log cR > 0
                                                    d
for a fixed-power improvement. Taking R large makes log cR close to 0. So the arithmetic condition is
essentially k log 2 > (log hK )/d, with the cost 2 log q in the denominator of the exponent.
    For arbitrary fields there is an analytic class number bound
                                                    √
                                          hK ≤ C d ∆ (log ∆)d−1 /RK


                                                         43
in some form. If the root discriminant is bounded, this still allows

                                              log hK = O(d log d)

because of the logarithmic factor, unless regulator or residue information is used. That is too large for
fixed k. Brauer-Siegel for a tower would suggest a linear bound instead, but the constant could be large,
and increasing k to beat it also increases q and requires those primes to split throughout the tower. The
whole possible counterexample sits on this unresolved arithmetic count: how many principal sign ideals, or
equivalently how many controlled-denominator CM Weil numbers, can one force in an infinite CM tower
with prescribed split primes?
    If even one rational prime, or better a fixed finite set of rational primes, splits all the way up a tower,
then the available sign entropy is exponential in the degree.
    The splitting cannot simply be chosen field-by-field. In a fixed infinite tower one cannot ask for the first
k split rational primes with k → ∞. For each finite degree field one could choose the first k rational primes
that split completely, but Chebotarev only says they occur at density 1/[K : Q], and the smallest ones may
be enormous. If q is the product of these rational primes, then log q may be of size kd after optimization.
That cancellation is precisely the usual Erdős-type 1/ log log n behavior.
    In a degree 2d field, asking for kd prime ideals available as sign choices through rational primes splitting
completely means about k rational primes. If they are not fixed in advance, the product of the rational
primes has log q comparable to k log(kd) or worse, and after multiplying by degree this eats the entropy.
Effective Chebotarev in the worst case is even worse: the first split primes can be exponential in d. So this
route cannot beat the standard construction by itself.
    Could K be a Hilbert class field, or a ring class field of an imaginary quadratic field, where many small
rational primes split completely because of congruence or representation conditions? Again the splitting
primes are governed by binary quadratic forms; the smallest ones grow with the discriminant. The divisor-
bound mechanism likely reappears.
    The general prime ideal theorem in a tower suggests the same picture. Completely split rational primes
have density 1/[K : Q]. To get kd prime pairs, rational primes up to roughly kd log(kd) times the degree are
needed, so log q accumulates a factor like kd log d. The degree gain cancels. Fixed split primes in a tower
are the only possible improvement, and then the class group penalty is the next obstruction.
    An aﬀirmative upper-bound proof might therefore try to bound the number of Weil numbers, or these sign
ideals, in arbitrary CM fields using class field theory. But arbitrary planar configurations are not obviously
CM S-unit configurations, so that is not a direct route to the original problem.
    The negative-looking construction remains worth pushing. There are class field towers with positive
Tsfasman-Vlăduţ invariants: many degree-one primes of some fixed norm, linearly many in the degree.
Suppose in such a tower there are N = φd prime ideals of norm q. Among the 2N sign choices, the
principal ones should be about 2N /h, at least under the provisional principal-fibre intuition. If the class-
number exponential rate H is smaller than φ log 2, then exponentially many principal sign ideals, hence
exponentially many unit directions, would appear.
    The function-field analogy is seductive. Over a finite field, the class number grows like q g , while the
                                     √
number of rational places can be ( q − 1)g. The number of principal subset divisors among 2N subsets is
                                                                                √
about 2N /h, so one needs N > g log2 q. Drinfeld-Vlăduţ gives N of order q g, which beats this for large
q. This is exactly the sort of entropy-versus-Jacobian comparison used in algebraic-geometric codes. The
number-field analog might produce too many Weil numbers.
    The denominator needs care. If in a number field there are N prime ideals of norm q = pf , they may all
lie over only finitely many rational primes. A fixed rational prime p splitting completely gives d conjugate
pairs at the cost of one rational denominator p, not pd as a product of distinct rational primes. On the other
hand the lattice p−1 OK has covolume cost p2d . So there is still a cost per prime ideal, roughly log p per
degree, but it is compatible with fixed rational primes.
    Thus an infinite tower with t fixed rational primes split completely would give N = td sign bits. After
class penalty the number of directions is like

                                             exp((t log 2 − H)d).
                                                  Q
The denominator is the fixed rational integer q = p∈S p, and the point set size from a lattice window should


                                                      44
grow like
                                      exp((2 log q + window constant)d)
up to discriminant normalization. If t log 2 > H, a fixed positive power improvement follows.
    Can such a tower be arranged? Golod-Shafarevich with splitting conditions comes to mind. If a base
field has large 2-class rank r, the maximal unramified pro-2 extension in which a finite set S of primes splits
completely remains infinite provided the number of imposed splitting primes is not too large. Roughly the
relation rank increases by |S|, and the GS criterion is something like

                                                 rrel < d(G)2 /4.

For an imaginary quadratic field with many ramified primes, genus theory gives 2-class rank about the
number of ramified primes. Then one might impose |S| up to order r2 . The root discriminant of the base
grows like exp(O(r log r)), so a class-number exponential constant of that size might be beaten by t log 2 ∼ r2 .
    There is also the product q of the prescribed split rational primes. If t ∼ r2 such primes are needed and
they are large, then log q may be huge, say r3 log r if chosen very crudely. Still, for a fixed base and fixed S,
that only makes the eventual power δ small, not zero. Any fixed δ > 0 would eventually beat C/ log log n.
So denominator size alone does not dismiss this possibility.
    Known incidence bounds give a sanity check. If a fixed prime p split completely in a tower and all
sign ideals were principal, there would be about 2d unit directions at denominator p. A cut-and-project
point set from p−1 OK might have n ∼ Ad points and degree 2d . If log 2/ log A > 1/3, this violates the
Szemerédi-Trotter/crossing-lemma n4/3 upper bound. Therefore some arithmetic inequality must prevent
the too-strong cases: class group penalty, discriminant, window overlap, or something comparable. A smaller
positive exponent would still be compatible with known upper bounds.
    The geometric step can be stated cleanly. Let K be a number field, one chosen complex embedding σ0 ,
and let Λ be a fractional ideal. Suppose U ⊂ Λ is a finite set such that

                                                      |σ0 (u)| = 1

for all u ∈ U , and the other embeddings are bounded, say |σj (u)| ≤ Aj . Take a product window Ω in the
Minkowski space, with large radii Rj > Aj in the hidden coordinates and no restriction or an appropriate
disk in the visible coordinate. For a translate t + Ω, set

                                                Xt = Λ ∩ (t + Ω)

and project to the plane by σ0 . If x, x + u ∈ Xt , their visible projections are at distance one. Averaging over
the torus of translates, the expected number of points is vol Ω/ det Λ, and for each u the expected number of
oriented edges is vol(Ω ∩ (Ω − u))/ det Λ. If the radii are chosen uniformly larger than the hidden conjugates,
that overlap is a fixed exponential-in-degree fraction of the volume. Thus some translate has edge/point
ratio comparable to |U | times that overlap factor. Also σ0 is injective on K, so distinct algebraic differences
give distinct visible directions, except for the obvious ±.
    This is the cut-and-project machine. Applied to cyclotomic fields it just recovers the Erdős lower bound.
In K = Q(ζm ), take primes p ≡ 1 mod m up to X. The number of sign bits is about
                                                           X            X
                                   d π(X; m, 1) ∼ d                ∼         ,
                                                        ϕ(m) log X   2 log X
while
                                              X
                                   log q ∼        ,        log n ∼ 2d log q ∼ X.
                                             ϕ(m)
So log M ∼ X/ log X, exactly the standard lower bound. Class group is not the issue there, because split
primes in cyclotomic fields are principal in the needed way. To improve the constant to a fixed power requires
exceptional splitting in a tower.
    For principal sign ideals, let K be CM of degree 2d, with conjugation ¯. If rational primes in S split
completely, then for each prime and each conjugate pair of prime ideals {p, p̄} choose one side. This gives
2td ideals I with
                                                    I I¯ = (q)


                                                          45
            Q
where q =       p∈S p. If I = (α), then
                                                      u = α/ᾱ
has |σ(u )| = 1 for every embedding of a genuine CM field, and qu is integral up to the fixed denominator.
The number of principal sign ideals would be at least 2td /hK if pigeonhole controlled the trivial class. It
only controls a large class fibre, so this is still the naive principal count rather than the final argument.
    Can one bound hK by exp(Hd) with√H fixed in a bounded-root-discriminant tower? A crude Minkowski
bound gives something like (C log ∆)2d ∆, i.e. an unwanted d log d term in the exponent, and that would
kill a fixed number of split primes. Analytic class number estimates should remove it. From the residue:

                                                             2r1 (2π)r2 hK RK
                                           Ress=1 ζK (s) =          √         .
                                                                 w K ∆K
For any fixed ε > 0,
                                   Ress=1 ζK (s) ≤ ε ζK (1 + ε) ≤ ε ζ(1 + ε)[K:Q] .
Then a lower bound for regulators, e.g. Friedman/Zimmert type, gives
                                                   p       [K:Q]
                                              hK ≤ Cε rd(K)

up to harmless constants. So class number has a constant exponential rate in a fixed-root-discriminant tower.
Good; no d log d obstruction.
   This makes the class-field-tower route look more concrete. Start with a base field k, take its maximal
unramified pro-2 extension in which the primes above a finite rational set S split completely. Shafarevich
gives an inequality of the form

                                  r(G) ≤ d(G) + |S| + archimedean/unit terms,

and Golod-Shafarevich makes the group infinite if this relation rank is < d(G)2 /4. In an imaginary quadratic
base with many ramified primes, d(G) can be made large by genus theory, so imposing many split primes is
possible. The root discriminant stays that of k, and the primes in S split at every finite level.
   A serious structural issue remains: the ratio α/ᾱ requires a CM involution. An arbitrary unramified
extension of an imaginary quadratic field is not necessarily a CM field in the needed sense. It is totally
imaginary, and it may be stable under some complex conjugation in a normal closure, but the construction
needs a single involution τ on K such that for every embedding σ,

                                                    σ(τ x) = σ(x).

Equivalently, K must be a totally imaginary quadratic extension of a totally real field; in a Galois closure
the complex conjugation should be central.
    This is not automatic in class field towers over imaginary quadratic fields. Consider the Hilbert class
field example. The Hilbert class field H of an imaginary quadratic k is abelian over k, but over Q the
normal closure has dihedral behavior: complex conjugation acts on the class group by inversion. If the
class number is odd and > 1, the dihedral group has trivial center. A Galois CM field would have central
complex conjugation, so this H is not a Galois CM field. Is H itself CM as a non-Galois field? The familiar
description through k(j) and singular moduli does not immediately supply the needed involution across every
embedding. In any case, for the modulus identity at all embeddings, arbitrary abelian-over-k structure is
not enough. If σ ◦ τ is not σ, then |σ(α/τ α)| need not be 1.
    The imaginary-quadratic tower may therefore be the wrong object. A safer choice is a totally real tower
Fj followed by
                                                 Kj = Fj (i)
or Fj k0 for a fixed imaginary quadratic k0 . Then Kj is definitely CM, with central conjugation acting only
on i. Rational primes splitting completely in both Fj and k0 split completely in Kj , and the conjugate pairs
are the two primes above the quadratic CM extension. The root discriminant is still bounded, multiplied by
the fixed contribution from k0 .


                                                         46
    Do totally real infinite towers with many prescribed split rational primes exist? Golod-Shafarevich should
also produce totally real class field towers, though the unit rank contributes to the relation rank. Martinet
constructed totally real towers; Hajir-Maire/Koch type theorems allow prescribed splitting if the class group
rank is suﬀiciently large relative to the unit and splitting constraints. One can take a totally real base with
very large p-class rank, perhaps by genus theory in multiquadratic or other ramified extensions, and impose
a finite set S. Optimization is unnecessary; it is enough that t be large enough so that t log 2 beats the
class-number constant after adjoining i.
    There may still be a deeper inequality. In Tsfasman-Vlăduţ language, split primes of norm p contribute
to invariants φp . The basic inequality involves terms like
                                                              p
                                                  φp log
                                                             p−1

(or the sharper p1/2 denominator in other formulations), which are tiny for large p. Thus one can prescribe
many large split rational primes without violating the basic inequality. But the class number / Brauer-
Siegel limit is of order the genus, roughly 21 log rd per degree in elementary terms, while the sign entropy
from a completely split rational prime is (degree/2) log 2. For large prescribed S, the entropy seems able to
dominate.
    On the other hand, in the actual point construction the denominator contains
                                                       Y
                                                   q=      p,
                                                            p∈S

so the final exponent is roughly
                                                     t log 2 − H
                                   δ≈                                       .
                                        2 log q + window/discriminant terms

If the prescribed primes are chosen huge to make the tower exist or to satisfy splitting in the base, then δ is
tiny. But tiny and fixed is enough for a negative answer. So denominator size is not a fatal objection.
    Szemerédi-Trotter supplies an arithmetic-looking upper bound on the plan. Suppose U is the set of such
unit directions in q −1 OK . The cut-and-project set with hidden radii R has size roughly
                                                                    d
                                                            R2 q 2
                                                  n
                                                           rd(K)

morally. Szemerédi-Trotter would force
                                                   |U | ≲ n1/3
for the degree of the unit-distance graph, i.e.
                                                                    d/3
                                                            R2 q 2
                                              |U | ≲                        .
                                                           rd(K)

Letting R approach the minimum allowed hidden bound gives a nontrivial upper bound on how many
principal sign ideals can exist. So if the entropy construction ever predicts an exponent > 1/3, some hidden
assumption must fail. But an exponent 0.001 would not contradict any known incidence theorem.
   This construction may connect to known work on Weil generators, CM fields, or algebraic unit-distance
graphs. The standard rational/cyclotomic construction is certainly known. Number theorists may have
studied counts of q-Weil numbers in CM fields; the relative class group, not the full class group, is the right
obstruction. For a CM field K/F , the sign ideal classes live in the kernel of the norm map Cl(K) → Cl(F ),
the minus class group. In many CM towers that relative class number is enormous. But the crude analytic
bound is still only exponential with a constant, so enough prescribed split primes could in principle beat it.
   There is another subtlety: in a pro-2 class field tower, a prime forced to split has trivial Frobenius in
the chosen pro-2 quotient, but its ideal class may only be killed modulo the 2-primary part. Odd class
groups upstairs can still be large. However the pigeonhole over the entire class group does not care about
individual principalness if there are enough sign vectors relative to hK . A large kernel or a large fibre that


                                                           47
can be converted to principal ideals is enough; the naive version was too quick about “principal,” but entropy
versus total hK is the right scale.
    The candidate negative proof would be: build a totally real unramified tower Fj /F0 with a fixed set S of
t rational primes splitting completely; set Kj = Fj k0 for fixed imaginary quadratic k0 in which S also splits.
In Kj , form 2tdj sign ideals over S. Use a class-number bound
                                                                 d
                                                  h(Kj ) ≤ H0 j

with H0 fixed. Choose t so that 2t > H0 after accounting for the overlap factor in the cut-and-project
window. Then obtain exponentially many bounded-conjugate unit directions with fixed denominator Q.
                                                                                             d
The geometric averaging gives unit-distance graphs with point count B dj and average degree D0 j , hence

                                                                     log D0
                                    ν(Pj ) ≳ |Pj |1+δ ,         δ=          > 0.
                                                                      log B

Then because log log |Pj | → ∞, this beats |Pj |1+C/ log log |Pj | for every fixed C along a subsequence, and
padding would handle arbitrary N for the negative formulation.
    The tower with many split primes and the CM structure still require justification simultaneously. For
imaginary quadratic bases, GS is easy but CM centrality fails. For totally real bases, CM is easy after
adjoining i, but the GS construction has the unit-rank penalty. Is there a theorem strong enough? Shafare-
vich’s bound for the S-split unramified pro-p group should have relation rank at most generator rank plus
something like r1 + r2 + |S|.√For a totally real base of degree m, the unit term is m. Therefore p-class rank
must be much larger than m + t. Known GS tower constructions arrange class rank linear in m, so for
fixed t or even t proportional to m2 this can work if the constants are right. Since only a fixed base and
finite S are needed, the base may be enormous.
    At the same time, the class-number exponential constant H0 for Kj depends on the root discriminant of
this enormous base. If the base is made by ramifying many small primes, log rd grows like r log r. To beat
H0 , t may need to be of order r log r, not merely fixed small. GS might allow t up to order r2 , so there
is room. The rational primes in S can be selected to split in the base and in k0 ; Chebotarev gives them,
perhaps very large. Their product makes δ tiny, but still positive.
    Several nontrivial theorems are needed in exactly the right form: prescribed splitting in infinite totally
real unramified towers; class-number upper bounds uniform in the tower; conversion of a large class fibre of
sign ideals into actual α/ᾱ; and cut-and-project packing so the selected translate has not too many points.
The last can be proved by a packing bound in Minkowski space; the first is class field theory.
    The comparison
                √ with asymptotic class number formulas is stark. In a tower with fixed root discriminant,
write g = log ∆, so g is proportional to degree. A rational prime p splitting completely contributes
φp  [K : Q]/g, about 2/ log rd. The basic inequality sums φp log(p/(p − 1)), tiny for large p. The class
number limit is roughly a constant times g, i.e. per degree about 21 log rd plus corrections. The sign entropy
from t split rational primes is about t(deg /2) log 2. At this heuristic level, taking t large compared with
log rd overwhelms the class number.
    It helps to isolate the entropy balance. If in a tower t rational primes split all the way, then the sign
choices give entropy about
                                               t · (degree) log 2.
The class group costs entropy. If log h ≈ g and the degree is about 2g/ log rd, then the class-number entropy
per degree is roughly
                                                      1
                                                H ≈ log rd .
                                                      2
Morally, it is enough that
                                                 t log 2 > H.
Choosing t > 12 log(rd)/ log 2 would make the sign entropy win. The cost of having these t primes in the
denominator is negligible for this comparison if the primes themselves may be enormous. It only enters the
final exponent through                                X
                                              log q =    log p.
                                                          p∈S


                                                          48
Then the power gain would be something like

                                                       t log 2 − H
                                                 δ≈     P          ,
                                                      2 p∈S log p

positive but perhaps ridiculously small. Positive is enough.
    The remaining question is whether some hidden obstruction prevents prescribing arbitrarily many large
split primes in a class field tower. In Golod-Shafarevich, prescribed splitting
                                                                              √       contributes relations essentially
by |S|, not by log N p. The base class√    rank  has to  be on  the order  of   t.  The base root discriminant grows
with
P     that rank, maybe   giving H  ∼    t log t, while the sign entropy is t log 2. That still wins. The denominator
   log p may be astronomical, but finite, hence gives a positive δ.
    Suppose there is a totally real field F0 with an infinite unramified 2-class field tower in which a prescribed
finite set S of rational primes splits completely. There should be a theorem of this form — towers with
prescribed splitting, associated to Kisilevsky/Labute/Hajir-Maire/Maire — or a direct Golod-Shafarevich
presentation. For now assume it.
    Let Fm be finite layers, with degree dm → ∞, bounded root discriminant, and all primes in S split
completely. Then put                                           √
                                                   Km = Fm ( −a)
                                                                                      √
for a fixed positive integer a, chosen so that every p ∈ S also splits in Q( −a). Then Km is CM, with
conjugation central, and every p ∈ S splits completely in Km . If dm = [Fm : Q], then for each p ∈ S and
each of the dm primes of Fm above p, there are two conjugate primes in Km . One prime can be chosen from
each conjugate pair. That gives
                                                        N = tdm
binary choices and hence 2tdm “sign ideals”.
   The naive version maps all these ideals to Cl(Km ) and hopes many are principal. If

                                                   h(Km ) ≤ C dm

and 2t > C, then exponentially many principal sign ideals would follow. For a principal sign ideal I = (α),
the ratio
                                                u = α/ᾱ
has all complex embeddings of modulus 1, and it has denominator supported only on the fixed rational
primes S. These u’s are unit-length directions in the distinguished embedding. Then a cut-and-project
lattice set should give many planar unit distances.
    In a tower with bounded root discriminant, it is plausible that h(Km ) ≤ C dm . Analytic class number
formula plus regulator lower bounds should give exponential-in-degree. For CM K, degree 2d, the formula
is                                                √
                                                w D
                                         hR =         Ress=1 ζK (s)
                                                (2π)d
up to the usual real-place factor, and here there are no real places. A Friedman-type regulator lower bound
gives R ≥ cd . If the residue is bounded by a constant to the degree when the root discriminant is bounded,
this is enough. This is one analytic place where a stray log d per degree would be fatal.
    The principal-class issue in the sign ideals is not right as stated. The 2N sign ideals are just a set, not a
subgroup. Multiplying two sign choices is not another sign choice; toggling one prime introduces P/P̄ , and
[P ] need not have order two. Pigeonhole says that some ideal class contains at least 2N /h(Km ) sign ideals.
It does not say the principal class contains that many.
    But the principal class is unnecessary. Suppose a large fibre consists of sign ideals I all in the same ideal
class. Choose one fixed representative B from that fibre. Then

                                                    IB −1 = (αI )

is principal for every I in the fibre. Define
                                                    uI = αI /αI .


                                                          49
This still has all embeddings of modulus 1. Its ideal is

                                             (uI ) = IB −1 I¯−1 B̄.

Since both I and B are supported on the primes above the fixed rational set S, all valuations of (uI ) are
bounded, say between −2 and 2, at those primes and zero elsewhere. If
                                                  Y
                                              Q=      p,
                                                       p∈S

then uniformly
                                                Q2 uI ∈ O K m .
So the denominator is fixed across the tower. This fibre repair is exactly what is needed.
    Distinctness also matters. If two choices I, J give the same u, then the anti-invariant ideal I I¯−1 equals
  ¯−1
J J . For sign ideals, that should determine the sign at every conjugate pair, so I = J. There may be
harmless ambiguity from units: replacing αI by a unit multiplies uI by ε/ε̄, which in a CM field is a root of
unity by Kronecker. In the special F (i)
                                      √ case this is bounded. So at most a bounded factor is lost.
    Take a real quadratic field F = Q( D) whose discriminant is a product of many primes. By genus theory
the narrow 2-class rank is large, roughly the number r of ramified primes minus 1. Golod-Shafarevich says
that if the maximal everywhere-unramified, totally-real pro-2 extension with a set T of primes forced to split
has generator rank d and relation rank r(G), then a Shafarevich bound of the form

                                   r(G) ≤ d(G) + |T | + r1 + r2 + constant

should hold. For a real quadratic field and T consisting of primes above t rational primes, this is approxi-
mately
                                           r(G) ≤ d(G) + 2t + 2.
Golod-Shafarevich gives infinitude if
                                                             d(G)2
                                           d(G) + 2t + 2 <         .
                                                               4
Thus with d(G) ≈ r, one can allow t on the order of r2 .
    Forcing primes to split can also kill generators if their Frobenius classes span the class group. The primes
in T should therefore be principal in the narrow sense in the base field. Then their Frobenius elements
are already in the Frattini/commutator part, and imposing splitting does not reduce the generator rank;
it only adds the intended relations. Equivalently, invoke the standard Golod-Shafarevich theorem with
prescribed splitting at principal primes. There are infinitely many such rational primes: choose primes
splitting completely in the narrow Hilbert class field of F , and also impose p ≡ 1 (mod 4) so that they split
in Q(i). Chebotarev gives as many as needed, though they may be enormous.
    So a concrete plan is: choose r large, take F real quadratic with discriminant product of r odd primes,
say all 1 mod 4. Genus theory gives d2 Cl+ (F ) ≥ r − 2. Then choose t rational primes p1 , . . . , pt ≡ 1 mod 4
which split into narrow-principal primes in F . If

                                         (r − 2) + 2t + 2 < (r − 2)2 /4

in the appropriate direction — more carefully d + 2t + 2 < d2 /4 — then the totally real 2-tower in which
those primes split is infinite. Let its layers be Fm . Then take

                                                 Km = Fm (i).

This is CM; the root discriminant is bounded by a constant depending on F and i; and the pi ’s split
completely in Km .
   There
       √ was a parameter trap in choosing an imaginary quadratic field after picking arbitrary S. If
E = Q( −a) is chosen by CRT to split all primes in S, the discriminant of E may be of size comparable to
Q, and then the root-discriminant/class-number entropy H could grow like log Q, wiping out t log 2. Taking
E = Q(i) fixed and choosing pi ≡ 1 mod 4 avoids that.


                                                      50
    There is another parameter trap if S is prescribed before constructing F : making all ramified primes
of F satisfy residue conditions modulo every p ∈ S can force the discriminant of F to depend badly on Q.
Better to choose F first, with large genus rank, and then choose principal split primes of F . Their size only
enters the final denominator Q, not the root discriminant of the tower. Since only a positive exponent is
needed, enormous Q is acceptable.
    Let Lm = Q−2 OKm be embedded in
                                              K m ⊗ Q R ≃ Cd m ,
using one embedding from each conjugate pair. Let Um be the set of directions uI . A finite planar set
comes from taking lattice points whose hidden embeddings lie in a window and projecting the distinguished
coordinate to C.
    The standard averaging calculation is as follows. Take Ω ⊂ Cd to be a product of disks of radius R. For
a translate y + Ω, set
                                             Xy = (y + Ω) ∩ L.
The expected size over the torus is
                                                             (πR2 )d
                                               E|Xy | =              .
                                                            covol(L)
For a fixed u ∈ U , all coordinates of u have modulus 1. Hence

                                            vol(Ω ∩ (Ω − u)) = adR ,

where aR is the area of intersection of two radius-R disks whose centers are distance 1 apart. Thus
                                                                   adR
                                             EEy = |U |                  .
                                                                covol(L)
The average oriented edge/point ratio is therefore
                                                                      aR
                                            |U | cdR ,      cR =         .
                                                                     πR2
   The overlap factor is cdR , not cR . In a product window, translating by a unit-modulus vector in every
coordinate loses a constant factor in every coordinate. But cR → 1 as R → ∞, so this is just another
exponential-in-degree penalty. Choose R fixed but large enough that it does not erase the sign entropy.
   More precisely, from the sign-ideal fibre,
                                                             2tdm
                                                 |Um | ≳           .
                                                            h(Km )

If h(Km ) ≤ H0dm , then
                                                                       d m
                                                                2t
                                            |Um |cdRm ≳            cR          .
                                                                H0
Let
                                                            2t
                                                     D0 =      cR .
                                                            H0
One needs D0 > 1. Choose t large enough for 2t /H0 > 1, and then R large enough that cR is close to 1.
    Averaging gives a translate with edge/point ratio at least about D0d . To convert this degree-based gain
into a power of the actual number of projected points, a uniform exponential upper bound for |Xy | is needed.
A translate with good ratio might otherwise, in principle, have a very large number of lattice points.
    There is a simple packing bound. If x ∈ Q−2 OK is nonzero, then Q2 x is an algebraic integer, so
                                       Y
                                          |σ(Q2 x)|2 = |N (Q2 x)| ≥ 1.
                                        σ

Therefore in the sup norm over the d complex embeddings,

                                               max |σ(x)| ≥ Q−2 .
                                                 σ


                                                          51
So the embedded lattice has minimum at least Q−2 in sup norm, and a product of disks of radius R contains
at most
                                        Bd,     B = (CRQ2 )2
lattice points, uniformly over translates. Thus the good translate has

                                                n = |Xy | ≤ B d .

If its oriented edge count is at least D0d n, then after dividing by harmless constants,

                                             ν(P ) ≳ n D0d ≥ n1+δ

with
                                                    log D0
                                               δ=          > 0,
                                                     log B
because n ≤ B d . Also n must tend to infinity along the tower; otherwise an edge/point ratio growing like
D0d is impossible.
    The projection to the distinguished complex embedding is injective on K, so distinct lattice elements
give distinct planar points. For each u ∈ U , if both x and x + u are in the window, then their projected
points are distance
                                                 |σ0 (u)| = 1.
Unordered edges and possible inverse directions only change constants.
    Together these ingredients would give a GS tower with t fixed split primes, a CM extension by i, sign
ideals, a large same-class fibre, ratios α/ᾱ, fixed denominator Q2 , cut-and-project counting, packing, and a
fixed power gain.
    The analytic class-number bound remains the delicate quantitative ingredient in this local argument. It
requires
                                                   h(Km ) ≤ H0dm
with H0 depending only on the fixed tower, not on m. Since the root discriminant of Km is bounded, this
ought to follow from a suﬀiciently sharp class-number estimate plus a regulator lower bound. But a bound
with an extra log d per degree would be fatal.
   The class number formula gives
                                                  p
                                               wK |DK |
                                     hK R K =            Ress=1 ζK (s)
                                                 (2π)d

for K CM of degree 2d, up to the standard constants. The discriminant term is (rd K)d , constant to the d.
The regulator lower bound is also constant to the d. Roots of unity are at most polynomial in the degree,
and in the F (i) setup likely bounded; in any case polynomial can be absorbed into C d . The issue is the
residue.
    Could one simply say
                                     Ress=1 ζK (s) ≤ ζK (2) ≤ ζ(2)2d ?
For a Dirichlet series with nonnegative coeﬀicients and a simple pole, the desired inequality would be

                                              Res F ≤ εF (1 + ε).

It feels true from positivity near the pole, and for ζ with ε = 1 it says 1 ≤ ζ(2). But monotonicity of
(s − 1)F (s) is not immediate. There is an integral representation with the ideal-counting function, but error
terms can have signs.
    If only a standard Landau bound is used, one gets something like

                                         Res ζK (1) ≤ C n (log DK )n−1 .

With bounded root discriminant, log DK  n, so this is (Cn)n . That contributes n log n to log h, not O(n).
Then no fixed t can beat the class group as the tower degree goes to infinity. The stronger constant-per-degree
residue bound, or some special cancellation, is essential; the crude general estimate is not enough.


                                                       52
    A controlled algebraic number can be turned into a unit-length translation in the chosen planar coordi-
nate.
    The first obstruction is the obvious one. If u is an algebraic integer and |σ(u)| = 1 for all archimedean
σ, then by Kronecker u is a root of unity. So the u’s cannot just be integral. They have to be S-units, or
at least elements with controlled finite denominators. That part is fine in a CM field: if K = F (i), or more
generally K/F is CM with conjugation c, then for any nonzero α,

                                                     u = α/c(α)
   satisfies |σ(u)| = 1 at every complex embedding, because c becomes complex conjugation after σ.
   The geometric skeleton is direct. Suppose K has d conjugate pairs of complex embeddings and one
embedding is chosen from each pair, so K ,→ Cd . Suppose all directions u lie in a common fractional lattice,
say at first crudely

                                                    L = Q−2 OK .
    Take a product window W , e.g. a product of disks of radius R. If x ∈ L ∩ W and x + u ∈ L ∩ W , then
after projecting to the first complex coordinate, the two projected points are distance

                                                     |σ1 (u)| = 1.
   The embedding is injective, so projection should not identify two lattice points unless their difference is
an algebraic number with one embedding zero, hence zero.
   The heuristic count is straightforward. The number of points in the window is roughly

                                                            (πR2 )d
                                                   N∼               .
                                                           covol(L)
    For one direction u, the number of usable translates is roughly the overlap volume of W and W − u, so
a factor cdR N , where cR < 1 but cR → 1 as R → ∞. If there is a set U of directions, the directed edge count
is approximately

                                                        |U | cdR N.
    So the whole question is whether |U | can be exponential in d with a base large enough compared to the
denominator, discriminant, and class group costs.
    The natural arithmetic source is this. Pick rational primes p1 , . . . , pt which split completely in the totally
real fields Fj in a tower. In the CM field Kj , above each prime of Fj there is a conjugate pair of primes.
Choosing one prime from each pair gives 2td sign choices. Ratios of conjugate ideals should give norm-one
S-units, up to a class group obstruction. So at the crudest level the target scale is

                                                                   2td
                                                        |U | ≈
                                                                    h
   or something of that flavor.                                                   Q
   Can this beat the losses? If the brutal lattice Q−2 OK is used, where Q =         pi , then scaling in real
dimension 2d gives a huge covolume change. Scaling each complex coordinate by Q−2 multiplies density by
something like Q4d . Thus the logarithm of n per d includes something like 4 log Q, plus a root-discriminant
contribution. Meanwhile the entropy per d is only t log 2, minus the class-number entropy.
   That gives a trial exponent

                                               t log 2 − (log h)/d + log cR
                                         δ≈                                 .
                                                4 log Q + log(rd) + O(1)
   If pi are the first t split primes, then
                                                        X
                                              log Q =         log pi ∼ t log t,
                                                        i≤t




                                                              53
    so t log 2/(4 log Q) ∼ 1/ log t. That collapses back toward the usual Erdős lower-bound scale, not a fixed
positive exponent. But Q−2 OK may be too crude.
    The denominator can be refined. If a rational prime p splits completely, the common denominator ideal
for choosing signs above p should have norm pd , not something like p2d or p4d unless numerator and conjugate
are both cleared too aggressively. In an ideal lattice, D−1 has covolume divided by N D, not by a rational
scaling in every real coordinate. For u = α/ᾱ, the denominator is the conjugate part of (α); if all selected
primes are cleared, the norm cost per rational prime is roughly pd , perhaps p2d depending on whether ratios
are taken. That is much closer to the Gaussian-integer picture.
    Indeed the classical construction over Z[i] works exactly by taking
                                                                      Q a product m of primes p ≡ 1 (mod 4).
There are 2t directions, but the grid scale is governed by q =          p. Optimizing over small primes yields
the familiar exp(O(log n/ log log n)) extra factor. The question here is whether the tower degree supplies d
independent copies of a fixed rational prime, so that a fixed finite set of split rational primes gives entropy
proportional to d while the primes themselves stay fixed.
    That is the dangerous part. Suppose one rational prime p splits completely in all Fj . Then in degree
d there are d prime pairs and 2d sign choices. The denominator cost is pd or p2d . This would give a fixed
entropy/denominator ratio. The obvious escape is the class group: most sign ideals are not principal.
    How large is the class group in a bounded-root-discriminant tower? It is at most exponential in d, not
worse. For example, via the analytic class number formula and residue bounds: Louboutin-type estimates
give a zeta residue bounded like a constant to the degree when log D  d. Regulator lower bounds, e.g.
Zimmert/Friedman, only help. So h ≤ H d with H depending on the root discriminant. If t is large enough
so 2t > H, the class-group pigeonhole would leave exponentially many directions.
    But H itself depends on the base field and on whatever is done to force split primes. If forcing many
rational primes to split makes the root discriminant grow like the product of those primes, then entropy
loses again. This needs to be tracked.
    Can there be an infinite tower of totally real fields in which a prescribed finite set of rational primes splits
completely and root discriminant stays bounded? Class field tower theory says yes in principle, if the base
field has enough class group rank and one imposes splitting at finitely many primes as relations. But the
cost of imposing t rational primes is not just t: in the base field of degree n0 , each rational prime contributes
n0 prime ideals if it already splits completely there. So the relation cost is tn0 . The available generator rank
comes from class group rank. It is not automatic that this can be made large enough relative to tn0 while
keeping root discriminant from exploding. This is one of the main parameter issues.
    Another subtlety: does one need the full class number of K, or only the relative/minus class group? The
sign ideals are anti-invariant under CM conjugation. If A is the product of one prime from each conjugate
pair, then A Ā is rational over F , hence principal up to the rational prime. The obstruction to A /Ā being
principal lives in something like the minus class group. That can be much smaller than hK .
    The relative class number scale is instructive. For K = F (i), the relative discriminant is supported over
2, but the absolute discriminant still contains DF2 . The CM relative class number formula gives roughly
                                                       wQ p
                                    h− = hK /hF ≈              DK /DF L(1, χ),
                                                      (2π)d
                                                                      √
    and since DK = DF2 N (dK/F ), the square-root factor includes DF . Thus per real degree it is something
like
                                                      p
                                                        rd(F )
                                                         2π
    times Euler factors and constants. If the tower root discriminant is 60 or 100, this base is not tiny. It
may be 1.2, 1.5, 2.5, depending on the relative discriminant and constants. One split prime gives entropy 2,
so it might or might not survive. With the full class group it probably dies; with the relative group it could
conceivably survive.
    But split primes also affect L(1, χ). If a prime of F splits in K, the Euler factor in L(1, χ) is (1−N p−1 )−1 .
If a rational prime p splits completely in F and then in K, this contributes

                                                   (1 − 1/p)−d .



                                                        54
   For p = 2 this is 2d , exactly the same base as the sign entropy from one rational prime. For p = 3 it is
   d
1.5 , partially cancelling. So the class number obstruction may be automatically swollen by the very split
primes used in the construction. On the other hand, inert primes contribute factors less than one. The sign
entropy cannot be read off without understanding this.
   Could the class loss be avoided by choosing the prime ideals to be principal throughout the tower? If a
prime ideal in the base is principal and splits completely in an unramified extension, the individual primes
above it need not be principal. If p = (π) in F0 , then in Fj
                                                        Y
                                                  (π) =    P,
                                                        P|p

    but the individual factors need not be principal. In the Hilbert class field, extension ideals from the
base principalize, but that means the product of primes above the base ideal becomes principal, not each
split factor separately. Climbing Hilbert class fields and using capitulation leaves the same obstruction: the
primes keep splitting into new factors. So the class-group pigeonhole should remain.
    Directions might instead use pairs of sign choices. If A and Aη are in the same ideal class, then A A−1  η
is principal; choosing a generator α and taking α/ᾱ gives a norm-one direction. The number of pairs in the
same class is about M 2 /h, where M = 2td . That suggests 4td /h, better than 2td /h. But different ordered
pairs can give the same difference pattern in {−1, 0, 1}td , hence the same ideal. So M 2 /h is an overcount of
pairs, not automatically distinct directions. Still, it indicates that the class group may not be as fatal as the
one-sign principality condition.
    The geometric side should also be checked for hidden impossibilities. Suppose exponentially many unit
directions u really occur in the field. Form the model set in Cd , project to C. Points in the plane may
be extremely close; that is allowed. The whole set may lie in a disk of radius R in the chosen coordinate;
that does not by itself force near-linear unit distances because there is no separation. The general planar
unit-distance upper bound O(n4/3 ) would only rule out average degree > n1/3 . The optimistic exponents
are often below 1/3.
    There are also results about unit distances in finite-rank additive subgroups. The additive group generated
by the model set has rank 2d or so. If the rank were fixed, subspace-theorem type statements would limit the
number of unit distances. But here the rank grows like d, and log n also grows like d, so rank is proportional
to log n. Those theorems do not immediately block a power saving or a power gain.
    A numerical sanity check helps. Ignore class loss. Take one split rational prime, say p = 5, and a tower
with root discriminant around 60. If denominator cost per degree is log 5, and discriminant/covolume cost
contributes roughly 21 log rd ≈ 2.0, then log n/d might be 3.6. Direction entropy is log 2 = 0.693, giving a
                                                                                                        √ d
putative δ ≈ 0.19. Not ruled out by the crossing lemma. With full class-number loss of size about rd , it
dies. With relative class-number loss maybe it is closer.
    What if a CM extension K/F is unramified at finite   √ primes, instead of F (i)? Then the relative discrimi-
nant is 1. The relative class number base is roughly A/(2π), where A = rd(F ). For A = 80, that is about
1.4. One split prime gives entropy 2, so after relative class loss there is still a factor 1.4d . But the lattice
covolume for K still contains DF , so point count per degree contains log A. The resulting exponent might
be small but positive. The marked prime must split in the CM quadratic extension too, so the prime of F
breaks into a conjugate pair. That can be imposed on finitely many primes.
    This is exactly where known asymptotically good towers enter. Odlyzko lower bounds say root discrim-
inant cannot be too small. Tsfasman–Vlăduţ inequalities say if many small primes split completely in a
tower, root discriminant must increase. But for a fixed finite set of split primes, the explicit-formula cost is
only finite. It does not obviously forbid one or two small primes splitting completely.
    Martinet-type towers come to mind: there are infinite class field towers with root discriminant around 90
and with some specified primes splitting. Hajir–Maire-type constructions allow prescribed splitting at finite
sets, at the cost of choosing a base field with enough class group. So the tower part is not absurd.
    Then why does the simple one-split-prime version not already work? Perhaps because the relative class
number, including Euler factors, always grows at least as fast as the sign-choice group generated by primes
above that rational prime. In other words, the classes of the primes above p might be essentially independent
in the minus class group. Pigeonhole only gives 2d /h− , and perhaps h− ≥ 2d when p splits completely in



                                                       55
such a CM tower. The Euler factor (1 − 1/p)−d goes in that direction but is not enough for p > 2. There
may be additional regulator or class field theoretic constraints.
    In S-unit language, the norm-one S-unit group has rank equal to the number of split finite-prime pairs
included, roughly td. Dirichlet says the rank is there. But the elements with valuation vector exactly ±1
require the corresponding divisor to be principal. Principal divisors form a sublattice of the free group on
the S-primes, of index the S-class group. The regulator of S-units and the class group together encode the
obstruction. Counting only sign vectors is too naive.
    Still, if a large fibre under the map from sign ideals to the class group suﬀices, one gets at least 2td /h
sign choices in one class. If h ≤ H d , choosing t with 2t > H is enough. Thus the whole problem becomes
whether t split rational primes can be prescribed in an infinite tower while keeping log H = O(log rd) much
smaller than t.
    Golod–Shafarevich frames the balance. For a maximal unramified pro-2 extension with a set T of primes
required to split, one has generator rank g roughly the 2-rank of the class group, relation rank r bounded
by g plus unit/infinite-place terms plus |T |. The group is infinite if roughly

                                                    r < g 2 /4.
    So if g is large, |T | of order g 2 split primes can be imposed. The cost is making the base field have large
2-class rank.                                                           √
    A simple source of large 2-rank is a real quadratic field F = Q( D) with D a product of many primes.
Genus theory gives 2-class rank about the number r of ramified primes. The degree is only 2, so relation cost
for t rational primes splitting in F is about 2t. Golod–Shafarevich might tolerate t  r2 . That is promising:
entropy from split primes is quadratic in r.               √
    But the root discriminant of a quadratic field is D. If r ramified primes of size about r are chosen,
then log rd ∼ 21 r log r. That would be much smaller than t  r2 . However the t marked rational primes
also need to split in F . If the marked primes are chosen first and every ramified prime rν is forced into a
quadratic-residue congruence class modulo each pi , the modulus is

                                                         Y
                                                         t
                                                  M=           pi .
                                                         i=1

   By Dirichlet/Linnik, the smallest ramified primes in those congruence classes might have size polynomial
in M , so log rν = O(log M ) = O(t log t). Then

                                              log rd(F ) ∼ r t log t.
           √
    If r ∼ t, this is t log t, larger than the entropy t. That loses badly. Forcing many specified small
                        3/2

primes to split by congruences can make the discriminant enormous.
    The ordering of choices changes the conclusion. Choose the quadratic field from many small ramified
primes first, get large class rank and moderate discriminant, and only afterward choose rational primes
which split in that fixed field. Chebotarev supplies infinitely many such primes. They may be large, but
only t  r2 of them are needed. Their product q enters the denominator constant; if the first t split principal
primes have size maybe polynomial or exponential in the base discriminant, then log q can still be large.
That denominator cost must be compared to the entropy t.
    For a fixed quadratic field, primes split with density 1/2. If principal/narrow-principal conditions are
also required, this is splitting in the Hilbert class field, with density 1/[H : Q], potentially tiny. The first t
such primes may be enormous in terms of the discriminant and class number. But for the final construction,
once the base is fixed, q is just a constant in the exponential-in-d point count. It affects the denominator
of δ, not the sign entropy numerator. If q is astronomically large, δ becomes tiny, but it remains positive
provided the direction entropy after class loss is positive. For disproving an n1+O(1/ log log n) bound, any fixed
positive δ would suﬀice along the tower.
    So the key positivity is not entropy divided by log q, but entropy minus class-number entropy:

                                                 t log 2 − log H.



                                                        56
   The denominator q only changes how small the final power δ is. That is a major distinction. If t can be
chosen quadratic in the class-rank parameter while log H is only about log rd, then positivity may be easy
even if the selected split primes are huge.
   Caution remains necessary. The class-number bound H is for the CM fields in the tower and depends
on the root discriminant of the base. If a real quadratic base is built with r ramified primes chosen small,
then log H = O(r log r). Golod–Shafarevich might let one mark t  r2 prime ideals to split. Then t log 2
dominates log H. This is the first parameter regime that really looks favorable.
   There are still several technical conditions. The marked primes should split in the real quadratic base,
probably be narrow principal so their Frobenius is trivial in the abelianized unramified tower, and also satisfy
p ≡ 1 (mod 4) if K = F (i) is used, so that primes split into conjugate pairs in the CM extension. They can
be chosen after the base by Chebotarev in the compositum of the narrow Hilbert class field and Q(i). They
may be huge, but fixed.
   Then in the marked pro-2 tower, imposing split at these principal primes should add relations but not
reduce generator rank, because their Frobenius elements lie in the Frattini subgroup if they are trivial in the
maximal elementary abelian quotient. If 2t prime ideals of the quadratic base are marked, the relation-rank
bound becomes something like

                                            r(G) + 2t < d(G)2 /4.
    So t would be chosen as a small constant times the square of the 2-class rank. This is the route to an
infinite totally real tower with all marked rational primes split completely.
    A possible remaining risk is structural rather than notational. There may be a hidden class-field-theoretic
inequality saying the class-number constant H for Kj grows with the number of marked split primes, even
though the root discriminant does not. But a crude universal upper bound on class numbers in bounded
root-discriminant families depends only on the root discriminant and degree; it cannot see the marked primes.
So if the tower exists with fixed root discriminant, h(Kj ) ≤ H d with H independent of t except through the
base. Then choosing t large via the GS surplus should beat it.
    The denominator and window construction then behave as before. Even if q is the product of very large
Chebotarev primes, q is fixed once the base and marked set are fixed. In the tower degree dj , the packing
bound will give |Pj | ≤ exp(Bdj ), where B contains log q, log R, and the root discriminant. If the edge
multiplier is exp(γdj ) with γ > 0, then the planar exponent gain is δ = γ/B > 0, perhaps ridiculously small.
That is enough for a negative answer.
    Choosing t split primes first and then forcing them into the base makes the base discriminant explode like
the congruence modulus. If instead a high 2-rank base is chosen first and split principal primes are picked
afterward, the split primes are large and make q huge, but they do not affect the sign entropy versus class-
number entropy. The denominator cost moves to the final δ denominator. The marked tower theorem and
the class-number bound still need verification, but the parameter obstruction may have come from choosing
the primes in the wrong order.
    The naive strategy is therefore too expensive: if each required splitting condition costs a modulus M ,
and log M ∼ t log t for the first t primes, then r ramified primes cost rt log t in log D. That is the trap.
    Maybe each ramified prime need not be forced separately. Another way to state the requirement is: seek
a quadratic character with prescribed signs on the first L primes. There are 2L possible patterns, and there
are about X quadratic characters of conductor ≤ X. Information-theoretically one only needs X ≥ 2L , so
log D ∼ L, not L log L. That is a huge difference. But then the number of ramified prime factors is not
automatically large; if the conductor is just some prime of size 2L , the genus rank is tiny.
    Optimization with a product gives a sharper heuristic. Suppose r ramified primes are wanted and their
product character should be +1 on a set S of t rational primes. Equivalently, the r Legendre-symbol vectors
in Ft2 should sum to a specified vector, say zero. If one vector is demanded at a time, the price is M . But
if many random primes are available, only some r-tuple whose sum is zero is needed. A random r-tuple has
probability 2−t to do that. If there are N candidate primes, there are about N r tuples, so the heuristic
threshold is

                                          N r > 2t ,    log N ≳ t/r.




                                                       57
                                                   √                                      √
   For the Golod-Shafarevich
                √            parameters r ∼            t keeps reappearing. Then N ∼ 2 t , so the primes only
need size exp(O( t)), and

                                              log D ∼ r log N ∼ t.
    That is the attractive regime. It would give a root discriminant whose logarithm is linear in t, not t log t
or t3/2 .                                                                                              √
    But can the required prime-vector randomness   Q be proved unconditionally at X = exp(O( t))? The
characters are modulo the huge product M = p∈S p, and X  M . Dirichlet equidistribution in classes
modulo M is useless there. Linnik would give a prime in a class of size M L , and then the cost returns to
log q ∼ t log t. So this “random Legendre vectors” picture is probably not a theorem in the needed form.
    The final sequence only needs one base/tower with a positive entropy balance. If a base field and t split
primes are already fixed, then in a class field tower the degree dj goes to infinity while t is fixed. Even if the
exponent gain δ is tiny, say δ ∼ 1/ log t, it is still a fixed positive number along that tower. Since log log n
grows like log dj , the product δ log log n tends to infinity. So for a negative result t need not tend to infinity
along the final sequence. It is enough to find one base/tower with a positive entropy balance.
    That changes the denominator worry. If the split primes are fixed, their product Q is fixed; the denom-
inator only changes the constant in log n per field degree. It can make δ small, but it cannot make it zero.
The real question is the numerator: does one get exponentially many unit directions per degree after paying
class-group and discriminant losses?
    For a quadratic base, the Golod-Shafarevich marked tower condition is roughly

                                                  r2 /4 > r + 2t,
   if r is the 2-rank coming
                        √      from genus theory and 2t is the number of marked prime ideals. Thus r has
to be on the order of t. If every ramified prime is individually forced to split at the chosen t primes, each
ramified prime has size about 2t , so log D ∼ rt ∼ t3/2 , and the root-discriminant/class-number cost dwarfs
the t log 2 entropy. If the random-product trick were available, log D ∼ t, and the entropy might win.
   This still feels precarious. Maybe the relative class number automatically cancels the sign choices. In a
CM field, above each split rational prime there are conjugate pairs of primes, and choosing one from each
pair gives 2d ideals. But principal elements require a class-group fibre. The relevant obstruction might be
the minus class group h− , not the full class group. Relative class number formula has Euler factors. If a
prime p splits in the CM extension, then the L(1, χ) factor has local factor something like

                                                  (1 − 1/p)−d ,
    which is exactly the kind of contribution produced by many split primes. Perhaps the class group grows
in the same representation as the sign choices and eats the whole 2td . I do not see a clean theorem, but this
is the obvious place for a hidden obstruction.
    Could the class group be bypassed by going up to Hilbert class fields and using principalization? The
principal ideal theorem says that an ideal of a field becomes principal in its Hilbert class field. But that
principalizes the extension of the ideal. If a prime of Kj splits into many primes upstairs, the extended ideal
is the product of all primes above it, not an individual chosen factor. And if the next Hilbert class field is
taken to principalize all sign ideals, the degree may be multiplied by the class number; the entropy per final
degree can evaporate. So capitulation is not a free solution.
    Maybe S-units instead of principal ideals with exact ±1 valuations help. In the S-integer ring all S-ideals
are principal, and the norm-one S-unit group has rank proportional to td. Counting S-units in a valuation box
[−B, B]td gives roughly B td / RegS candidates. The denominator norm is pBd , so one optimizes (log B)/B.
This is a softer version of the same issue: the S-regulator/class index may be exponentially large per degree.
Maybe enough split primes beat it; maybe a generalized Brauer-Siegel inequality says they cannot. Known
tower constructions with prescribed splitting come to mind. Hajir-Maire type results produce infinite towers
with a finite set of primes split and controlled root discriminant.
                                                                 P       But if the root discriminant bound is
basically the product of the prescribed primes, then log rd ∼       log pi ∼ t log t, and entropy t loses for large
t. On the other hand, large t is not necessary. There are Martinet-type towers with root discriminant
around 90. If several small primes split completely, maybe t log 2 beats the class-number constant. But
explicit principal-direction control is missing, and relative class groups may again be the obstruction.


                                                         58
    There is no trivial quantifier trick. The current upper bound O(n4/3 ) does not imply n1+C/ log log n ,
because eventually C/ log log n < 1/3. Disjoint unions of good configurations do not improve the exponent.
Blowing up each point by a tiny cluster does not work either: exact unit distance between two clusters
cannot give complete bipartite graphs of large size. Two circles intersect in at most two points; Km,m is not
a planar unit-distance gadget. So there is no elementary amplification.
    Finite fields also look tempting. Over F2q , the unit-distance graph has q 2 points and degree about q,
i.e. n3/2 edges. Could a graph realized by equations over infinitely many finite fields lift to characteristic
zero? The equations (xi − xj )2 + (yi − yj )2 = 1 do lift to complex algebraic solutions by Lefschetz-type
compactness, but complex solutions are not real Euclidean configurations. Over C, the quadratic form is
isotropic and geometry is completely different. Finite fields with involution and Hermitian norm still do not
transfer to the real closed condition |z − w|2 = 1. Real positivity and conjugation are not encoded by those
finite-field solutions. So this is a mirage.
    Another formulation uses a finite-rank additive subgroup G ⊂ C. If G contains m unit vectors, then a
coeﬀicient box in G gives roughly mn unit-distance edges. If m = exp(cr) unit vectors existed in rank r,
with coeﬀicient size bounded by a fixed M , then n = M r and there would be a fixed power gain. But generic
unit vectors generate rank proportional to their number; they do not create exponentially many further unit
vectors.                                                                                               √
    There are fixed-rank groups with infinitely many points on the unit circle. For example over Z[ 2], the
equation x2 + y 2 = 1 has Pell-type families. But coeﬀicient size grows exponentially along the family, so the
number of directions of coeﬀicient norm ≤ M is only O(log M ). Rational parametrization of the circle and
Gaussian primes give the classical Erdős construction: many rational directions with denominator q, but the
number is a divisor-function quantity. The CM/tower idea is exactly the attempt to get exponentially many
directions relative to field degree while keeping denominator fixed along a tower.
    Planar geometry does not immediately kill the cut-and-project model. Suppose a rank 2d lattice is
embedded in Cd , many vectors have first coordinate of length 1, and one intersects with a bounded product
window, then projects to the first coordinate. The projected set lies in a fixed disk. But arbitrary finite sets
in a disk can have many unit distances; there is no separation assumption in the plane. Crossings may be
numerous; the crossing lemma only recovers n4/3 . So no immediate planar obstruction appears.
    The negative construction can be assembled and tested for a fatal flaw.
    Take an infinite totally real unramified tower Fj , and set Kj = Fj (i). Then Kj is CM, and if rational
primes p1 , . . . , pt ≡ 1 (mod 4) split completely in Fj , they also split in Kj . For each conjugate pair of
primes above them, choose one. There are 2tdj sign ideals. Divide by the class number h(Kj ) to find a large
principal fiber. For principal
                           Q     ratios α/c(α), every complex embedding has modulus one. The denominator
is a fixed power of q = pi . Then the model-set argument should give unit translations.
    This needs

                                            2tdj /h(Kj ) ≥ exp(γdj )
   with γ > 0. Equivalently, a class-number bound h(Kj ) ≤ H dj and t log 2 > log H suﬀice.
   A standard analytic class number estimate raises a first concern:

                                     hK ≤ C n |DK |1/2 (log |DK |)n−1 /RK ,
   and if log |DK | = n log A, this has an nn factor. That would destroy the per-degree entropy. A tempting
replacement is to bound the residue at a fixed point. For s0 = 1 + c > 1, positivity of coeﬀicients suggests

                                              κK ≤ c ζK (1 + c).
   Euler factors give

                                            ζK (1 + c) ≤ ζ(1 + c)n .
   The analytic class number formula would then give
                                                           √
                                                      wK DK
                                           hK R K ≤ κK r 1     .
                                                      2 (2π)r2


                                                      59
    For totally complex n = 2d, this would be exponential in n if the root discriminant is bounded. Ignoring
the regulator lower bound, or using a very crude one, roots of unity are subexponential or at worst harmless.
This indicates why bounded root discriminant may give hK ≤ H(A)n without an nn loss, though the residue
bound itself still needs care.
    The tower and the split primes can be ordered favorably. The split primes do not have to be prescribed
before choosing the base field. Choose the base field first, with many small ramified primes, and then choose
rational primes that split in it. The marked primes may be enormous; they are fixed for the final tower.
Their size only affects the denominator constant, not whether the entropy per degree is positive.
    Choose a real quadratic field
                                                          √
                                                    F = Q( D)
   where D is the product of r small primes, say all 1 mod 8. Genus theory gives 2-rank roughly r − 1 in
the narrow class group. The root discriminant is
                                     √                          1X
                          rd(F ) =       D,      log rd(F ) =      log qa = O(r log r).
                                                                2
                                                                 a≤r

   Choose t rational primes that split in F and are 1 mod 4. More precisely, their prime ideals in F should
be narrow principal so that forcing them to split in the tower does not reduce the generator rank in the
abelianization. Chebotarev supplies such primes: take rational primes splitting completely in the narrow
Hilbert class field of F and in Q(i). There are infinitely many.
   Consider the maximal pro-2 extension of F unramified at finite primes and split at the real places, so
the layers stay totally real. Its generator rank is the narrow 2-class rank ρ ∼ r. Shafarevich’s relation-rank
bound is of the form

                                                  r(G) ≤ ρ + O(1)
    for this real quadratic situation. If the 2t prime ideals above the t rational primes are additionally
required to split completely, quotient by the normal closures of their Frobenius elements, adding at most 2t
relations. Since the primes were chosen narrow principal, their Frobenius classes are trivial in the maximal
elementary abelian quotient; this should not lower the generator rank.
    Golod-Shafarevich then says the marked quotient is infinite provided

                                               ρ + O(1) + 2t < ρ2 /4.
   Thus t can be a small constant times ρ2 .
   This is the decisive inequality. The entropy from sign choices is

                                                    t log 2  ρ2 ,
   while the root-discriminant contribution to the class-number constant is only

                                              O(log rd K) = O(ρ log ρ),
   because Kj = Fj (i) has

                                                 rd(Kj ) ≤ 2 rd(F )
    throughout the tower. For ρ large, t log 2 should dominate the class-number constant.
    This no longer depends delicately on small marked primes. The marked split primes can be chosen after
F , by Chebotarev, no matter how large. Their product q may be astronomically large, but fixed. The
eventual exponent δ in terms of n may be tiny because the model-set lattice is q −2 OK , but it is positive. A
fixed positive δ is enough to contradict an n1+C/ log log n upper bound along the tower.
    The class group obstruction could still be more subtle than the coarse class-number bound: perhaps
h(Kj ) is exponentially large with constant depending not just on root discriminant but also on the marked
split primes. But any uniform root-discriminant class-number estimate already includes all splitting behavior


                                                         60
and cannot see q. It gives some H(A). As long as t log 2 > log H(A), the principal fiber is exponentially
large. Since t  ρ2 and log H(A) = O(ρ log ρ), that can be arranged.
    For the CM extension, Fj is totally real, so i ∈ / Fj , and Kj = Fj (i) has degree twice that of Fj . The
relative discriminant of adjoining i divides (4), so the root discriminant multiplies by at most 2, not by an
uncontrolled factor. If the marked rational primes are 1 mod 4, they split in Q(i); since they already split
completely in Fj , they split completely in the compositum Kj .
    The tower layers Fj have degree going to infinity and root discriminant fixed. Every marked prime splits
completely in every layer by construction. So above each marked rational prime there are dj = [Fj : Q]
primes of Fj , and in Kj each gives a conjugate pair. That is exactly tdj independent sign choices before
quotienting by the class group.
    Choose r small ramified primes; get ρ ∼ r; choose

                                                      t ≤ cρ2
    marked rational primes splitting completely in the narrow Hilbert class field and in Q(i); form the marked
totally real unramified 2-tower; set Kj = Fj (i); use the 2tdj sign ideals and the bound h(Kj ) ≤ H dj .
    Enough rational primes with the desired properties exist. They need pb ≡ 1 (mod 4), splitting in F , and
preferably both primes above pb narrow principal. Splitting completely in the narrow Hilbert class field of F
implies that the prime ideals of F above pb are narrow principal. Intersect that Chebotarev condition with
splitting in Q(i). There are infinitely many such rational primes, so choosing t of them is no problem. Their
sizes may be absurdly large, but they are fixed once the construction is fixed. The denominator cost may
then make the eventual exponent δ tiny, but as long as it is positive that is enough. Along the tower degree
tends to infinity, so nδ will eventually dominate nC/ log log n for every fixed C. Even if δ = 10−10 , log log n
                                                                                                    10


is unbounded along the tower. So the actual sizes of these primes are a finite cost.
    Take the CM extension

                                                   Kj = Fj (i).
    Adjoining i only ramifies at primes above 2, so the root discriminant only changes by an absolute factor,
provided the Fj ’s are unramified over the base at finite primes. More precisely the relative discriminant
divides (4), so rd(Kj ) ≤ 2 rd(Fj ), up to the exact convention. The chosen rational primes also need to split
completely in Kj . Choose them p ≡ 1 (mod 4), and force them to split completely in the Fj ’s. Then they
split in Fj and in Q(i), hence in the compositum Kj . Since Fj is totally real, it is disjoint from Q(i), and
Kj is CM.
    The sign-ideal construction supplies the entropy. Put

                                                   d = [Fj : Q].
   For each selected rational prime p` , it splits into d primes in Fj , and each of these splits into two conjugate
primes in Kj . Thus for each p` there are d pairs

                                                      {P, P̄}
   in Kj . If t rational primes were selected, the total number of conjugate pairs is

                                                     m = td.
   For a sign vector  ∈ {±1}m , define an integral ideal A by choosing one prime from each pair:
                                                Y          Y
                                         A =         Pk        P̄k .
                                                  k:k =+     k:k =−
                                                     Q        d
   All these ideals have the same norm, namely (         ` p` ) . There are

                                                     M = 2td
   of them.
   Map the A ’s to Cl(Kj ). If two have the same ideal class, then their quotient is principal. If


                                                         61
                                                  [A ] = [Aη ],
   choose α,η such that

                                               (α,η ) = A A−1
                                                             η .

   Then set
                                                           α,η
                                                 u,η =          .
                                                           ᾱ,η
   For every complex embedding σ of the CM field, σ(ᾱ) = σ(α), so

                                                 |σ(u,η )| = 1.
   Also the ideal of u is supported only above the selected primes. In one coordinate, if  and η differ, the
valuation of u at Pk is ±2; if they agree it is 0. Thus if

                                                       Y
                                                       t
                                                  q=         p` ,
                                                       `=1

   then

                                                u,η ∈ q −2 OKj .
   The denominator is uniform in j.
   The estimate M 2 /h(Kj ) for directions overcounts. Different ordered pairs (, η) can have the same
coordinatewise difference. The possible difference patterns are ternary, not quaternary. In a single coordinate,
the quotient only sees whether the choice changed from P to P̄, the reverse, or did not change.
   Use one largest class fibre instead. Its size is at least
                                                     2m
                                                           .
                                                    h(Kj )
   Fix one base vector η in that fibre. Then for every other  in the same fibre, choose

                                                (α ) = A A−1
                                                            η

   and put
                                                           α
                                                   u =        .
                                                           ᾱ
   Distinct ’s give distinct ideals (u ), because the valuations at the primes Pk record 2(k − ηk ). So this
gives at least

                                                            2td
                                                 |Uj | ≥
                                                           h(Kj )
    distinct norm-one elements in q −2 OKj .
    This is enough if h(Kj ) is at most exponential in d, with base whose logarithm is O(r log r), where r
is the genus-theory rank parameter of the base field. The sign entropy per d is t log 2, and t  r2 , so this
dominates.
    Embed Kj into Cd by choosing one embedding from each conjugate pair. Let

                                             Lj = q −2 OKj ⊂ Cd .
   The u’s lie in Lj , and each coordinate of u has modulus 1.
   Take a product window



                                                       62
                                   WR = {(z1 , . . . , zd ) : |zi | ≤ R for all i}.
   For a translate a + Lj , set

                                             Xa = (a + Lj ) ∩ WR .
   If x, x + u ∈ Xa , then after projecting to the first complex coordinate their images differ by σ1 (u), which
has modulus 1. So these are planar unit distances.
   No asymptotic lattice point counting is needed. Average over the torus Cd /Lj . The average number of
vertices is

                                                     vol(WR )
                                                                .
                                                     covol(Lj )
   For a fixed u, the average number of directed pairs x, x + u in the window is

                                             vol(WR ∩ (WR − u))
                                                                .
                                                  covol(Lj )
    Since every coordinate of u has modulus 1, this intersection volume is adR , where aR is the area of overlap
of two radius-R disks whose centers are distance 1. Meanwhile vol(WR ) = (πR2 )d . Let
                                                aR
                                                    .
                                                    cR =
                                               πR2
   Then cR < 1, but cR → 1 as R → ∞. Summing over u ∈ Uj , some translate satisfies

                                                 Da ≥ |Uj |cdR |Xa |,
   where Da counts directed pairs. If

                                                     |Uj | ≥ eγd
   and R is large enough that log cR > −γ/2, then

                                                  Da ≥ eγd/2 |Xa |.
    The projection to the first coordinate is injective on a + Lj : if two lattice-coset points have the same
first coordinate, their difference is an element of Kj whose first embedding is 0, hence the element is 0.
Thus Pa = π1 (Xa ) has |Pa | = |Xa |. A planar unordered edge is counted at most twice in Da , once for each
orientation, because the projected difference determines the algebraic difference. Therefore
                                                     1
                                                   ν(Pa ) ≥
                                                       Da .
                                                     2
   An upper bound on n = |Xa | in terms of d comes from packing. For nonzero λ ∈ q −2 OKj ,

                                                 q 2 λ ∈ OKj \ {0},
   so

                                                               Y
                                                               d
                                      1 ≤ |NKj /Q (q 2 λ)| =         |σr (q 2 λ)|2 .
                                                               r=1
                                            −2
   Hence some coordinate has |σr (λ)| ≥ q        . Thus the lattice is q −2 -separated in the sup norm. Packing in
the polydisc gives

                                            |Xa | ≤ (CRq 2 )2d = eBd
   for a constant B depending on the fixed construction but not on j.
   Combining,


                                                         63
                                                          1
                                             ν(Pa ) ≥       |Pa |eγd/2 .
                                                          2
   Since |Pa | ≤ eBd , this gives a fixed power saving:

                                                ν(Pa ) ≥ |Pa |1+δ
   for some δ > 0, after absorbing constants and taking d large. Also n = |Pa | cannot stay bounded,
because the lower bound on the average degree tends to infinity while a graph on n vertices has degree at
most n − 1. Thus this gives a sequence n → ∞. Then for any prescribed C, eventually C/ log log n < δ, and
the Erdős-type upper bound fails.
   A number field tower with the required splitting is still needed.
   Take a totally real tower Fj /F , unramified at finite primes, in which the selected rational primes split
completely. The base should have large narrow 2-class rank and small root discriminant. Take F real
quadratic,
                                                       √
                                                 F = Q( D),
    where D is a product of l distinct primes,
                                           √       say all 1 (mod 8). Genus theory gives narrow 2-class rank
roughly l − 1. The root discriminant is D, so if the first such primes are used, log rd(F ) = O(l log l).
    Prescribing t  l2 split rational primes in an infinite totally real unramified 2-tower requires care. If
splitting is imposed at arbitrary primes, their Frobenius classes could kill the abelianization. There are far
more marked primes than class group generators. The marked primes therefore need to be trivial already in
the narrow class group. In other words, the prime ideals above them should be narrow principal.
    That is possible. After fixing F , choose rational primes p ≡ 1 (mod 4) that split completely in the narrow
Hilbert class field of F and in Q(i). Chebotarev gives infinitely many. Then the two prime ideals above p in
F are narrow principal, and p will split in F (i).
    Let G be the Galois group of the maximal pro-2 extension of F unramified at finite primes and split at
all real places. Its generator rank is

                                            d(G) = ρ = d2 Cl+ (F ).
   A Shafarevich relation bound gives something like

                                            r(G) ≤ ρ + r1 + O(1),
   in this quadratic case just ρ + O(1). Quotient by the normal closures of Frobenius elements at the
marked prime ideals. Since the marked primes are narrow principal, their Frobenius elements are trivial in
the maximal elementary abelian quotient; equivalently they lie in the Frattini subgroup. Thus the quotient
has the same generator rank ρ, and its relation rank increases by at most the number of marked prime ideals.
   If t rational primes are marked, that is 2t prime ideals in F . So require

                                                                    ρ2
                                              ρ + O(1) + 2t <
                                                                    4
    for Golod-Shafarevich. Choosing, say, t ≤ ρ2 /16 is safe for large ρ. Then the marked quotient is infinite.
Its finite layers give the desired totally real unramified tower, with all marked primes split completely.
    This also isolates why the principal-prime condition matters. If arbitrary split rational primes were
chosen, the splitting conditions could have annihilated the generator rank.
    For Kj = Fj (i), Fj is totally real, so i ∈
                                              / Fj , and

                                          [Kj : Q] = 2[Fj : Q] = 2dj .
   The fields Fj are unramified over F at finite primes, so rd(Fj ) = rd(F ). Adjoining i gives

                                               rd(Kj ) ≤ 2 rd(F ).



                                                          64
    The marked rational primes split completely in Fj , and because they are 1 (mod 4), they split completely
in Kj .
    For the class number estimate, use a coarse exponential bound in the degree for bounded root discrimi-
nant. Let n = [K : Q]. For s > 1, ζK (s) ≤ ζ(s)n , and a residue bound is needed to control κK . The analytic
class number formula says

                                                    2r1 (2π)r2 hK RK
                                             κK =          p         .
                                                       wK |DK |
    Here K = Kj is totally complex, so r1 = 0, r2 = dj . A lower bound on the regulator and an upper bound
on roots of unity complete the estimate. Friedman gives a universal exponential lower bound for RK /wK , or
at least RK is not worse than cn , and roots of unity are subexponential or can be absorbed into C n . Thus

                                                  h(Kj ) ≤ H dj
   where log H = O(log rd(Kj )) + O(1). For the chosen real quadratic base this is

                                                log H = O(l log l).
   The entropy from sign ideals is

                                                    t log 2  l2 ,
   so for l large,

                                             γ = t log 2 − log H > 0.
   The local CM facts are consistent. In a CM field K = F (i), the involution c fixing F and sending i to
−i satisfies

                                                  σ(cα) = σ(α)
    for every embedding σ : K ,→ C. So the modulus-one statement is correct, not just for the distinguished
embedding. The ambiguity in the choice of α is multiplication by a unit v, and v/v̄ is a relative unit of
modulus one at every embedding. In these F (i) fields the relative unit ambiguity is finite up to the Hasse
unit index; in any case distinct ideals (u) are being counted, so the ambiguity cannot identify two different
valuation patterns. Roots of unity only cost a constant.
    There is also a possible global obstruction from towers with many split primes. If t  l2 rational primes
are forced to split throughout a tower of root discriminant about eO(l log l) , does that contradict a Tsfasman-
Vlăduţ inequality? The marked primes can be chosen astronomically large. In the basic inequality their
                                                     √
contribution is weighted by something like log p/( p − 1). If the p’s are huge, this is negligible. So no
contradiction appears there.
    The tower must be totally real. For p = 2, ordinary unramified extensions of a real field can complexify
at infinity if the narrow condition is not used. Use the maximal pro-2 extension unramified at finite primes
and split at real places. Then its abelianization is governed by the narrow class group. The Shafarevich
relation estimate has extra real-place and unit terms, but for a quadratic base this is only O(1), or at worst
O(ρ); the quadratic Golod-Shafarevich margin absorbs it. So the construction should use the narrow 2-class
group throughout.
    The parameter chain is independent of j in the required way. Fix l large. Construct F . Let ρ ∼ l.
Choose

                                                      t ∼ cρ2
   rational primes p1 , . . . , pt , all narrow-principal split in F and 1 (mod 4). Let
                                                            Y
                                                        q=       pb .




                                                         65
    This q may be enormous, but is now fixed. Golod-Shafarevich gives an infinite tower Fj , with degrees
dj → ∞. Define Kj = Fj (i). The class number bound has a base Hl depending on l, not on j. The number
of directions satisfies

                                         |Uj | ≥ exp((t log 2 − log Hl )dj ).
    Choose l so the exponent γl is positive. Then choose R large depending on γl , and define windows in
the lattice q −2 OKj . The packing exponent B depends on q, R, so δ = γl /(O(B)) may be minuscule, but it
is positive and independent of j. That is all the negative resolution needs.
    The only place the selected primes’ sizes enter is q, hence B. Since q is fixed before j → ∞, it cannot
destroy positivity; it only shrinks δ.
    The class-number estimate is the place where the whole construction could silently lose an nn . A bound
of the form h(E) ≤ C(rd E)[E:Q] , or at least exponential in the degree with a base depending only on the
root discriminant, is enough. For the CM fields K in use, the regulator rank is d − 1 if [K : Q] = 2d, so the
denominator in the class number formula helps. A universal regulator lower bound should be enough.
    Friedman’s theorem is the relevant input. The bound has the form

                                    RK /wK ≥ 0.0031 exp(0.241n + 0.497r1 )

for a number field of degree n. For CM fields r1 = 0, n = 2d, so this is exponentially large in d, after roots
of unity are divided out. Then
                                               √               √
                                        κK w K D K         κK D K
                                  hK ≤                =                  .
                                          (2π)d RK      (2π)d (RK /wK )

A bound κK ≤ ζ(2)2d would finish immediately: hK ≤ exp((log rd K + O(1))d). But that residue bound
needs care.
   For the intended direction count, suppose hj ≤ exp((log rd K +C)dj ), and rd K ≤ 2 rd F , while log rd F =
O(` log `). Then the class group loss is only eO(` log `)dj . The entropy from sign choices is 2tdj , with t roughly
quadratic in `. So for ` large the exponent

                                              γ = t log 2 − O(` log `)

is positive.
    The marked tower gives finite layers of unbounded degree. An infinite profinite quotient has finite
quotients of arbitrarily large order; their fixed fields are finite number fields. They are totally real because
the tower is narrow and totally split at infinity. The marked primes are split because their Frobenius elements
were killed.
    The principal-prime condition is important. If a prime ideal p of F is narrow principal, its Artin symbol
is trivial in the full narrow Hilbert class field. Therefore in the pro-2 unramified narrow tower group its
Frobenius is trivial in the abelianization. In particular it lies in [G, G], hence in the Frattini subgroup
Φ(G) = G2 [G, G]. Imposing “p splits completely” by killing that Frobenius does not reduce the minimal
generator number. It just adds one relation.
    What I need from the tower is the following. Let G be the Galois group of the maximal pro-2 extension
of F unramified at finite primes and totally split at the real places. Then

                                                d(G) = d2 Cl+ (F ).

A Shafarevich relation-rank bound gives something like

                                       r(G) ≤ d(G) + r1 (F ) + r2 (F ) + 1.

For a real quadratic base this is d(G) + O(1). If one quotients by the normal closures of k principal Frobenius
elements, the quotient still has generator rank d(G) and has relation rank at most r(G) + k. If

                                               r(G) + k < d(G)2 /4,


                                                         66
Golod-Shafarevich says the quotient is infinite. So k = 2t can be a small fixed multiple of ρ2 , where
ρ = d2 Cl+ (F ).
   For the base take
                                              √           Ỳ
                                     F = Q( D),       D=      rν ,
                                                                         ν=1

with the rν ≡ 1 (mod 8) distinct. Genus theory gives narrow 2-rank ρ ≥ ` − 1. Also
                                                     1
                                        log rd F =     log D = O(` log `)
                                                     2
if the first such primes are used, or in any case finite and linear in the sum of their logs. Then choose

                                                   t = bρ2 /16c

or smaller; the exact constant is irrelevant as long as 2t + ρ + O(1) < ρ2 /4.
    The marked rational primes should satisfy pb ≡ 1 (mod 4), split in F , and make both primes of F over
pb narrow principal. Chebotarev supplies them: take primes splitting completely in the compositum of Q(i),
F , and the narrow Hilbert class field of F (or its Galois closure over Q). Then each prime of F above pb has
trivial narrow class. Pick t of them. They may be huge; that will only make the eventual δ tiny. They are
fixed once ` and the base field are fixed.
    The marked tower gives fields Fj with dj = [Fj : Q] → ∞, root discriminant equal to rd F , totally real,
and all the chosen rational primes split completely in Fj . Set

                                                   Kj = Fj (i).

Since Fj is totally real, [Kj : Q] = 2dj . The relative discriminant over Fj divides (4), so

                                                rd(Kj ) ≤ 2 rd(F ).

That part is stable in the tower.
   The sign-ideal construction must avoid overcounting. Fix j. For each selected rational prime pb , and
each of the dj primes p of Fj above it, the prime p splits in Kj = Fj (i), since pb ≡ 1 (mod 4). Thus in Kj
there are m = tdj conjugate pairs
                                        {Ps , cPs },    s = 1, . . . , m,
where c is complex conjugation over Fj .
   For every sign vector  ∈ {0, 1}m , define
                                                     Y          Y
                                            A =           Ps           cPs .
                                                   s =1        s =0

These ideals all have the same norm. Map the 2m sign vectors to Cl(Kj ). A largest fibre has size at least
2m /h(Kj ). Fix one element η in that fibre. For each  in the fibre,

                                                  A A−1
                                                      η = (α )

for some α ∈ Kj× . Define
                                                            α
                                                   u =           .
                                                           c(α )
Then for every complex embedding σ, because c is CM conjugation,

                                                           σ(α )
                                            |σ(u )| =                  = 1.
                                                           σ(α )

Also the valuations of u at the marked primes are explicit:

                                      vPs (u ) = 2(s − ηs ) ∈ {−2, 0, 2},


                                                           67
up to the convention of which prime in the pair was called Ps . Elsewhere the valuation is zero. Therefore, if

                                                           Y
                                                           t
                                                    q=          pb ,
                                                          b=1

then
                                                   q 2 u ∈ O K j .
So all directions lie in the same fractional lattice q −2 OKj , with q independent of j.
    Distinctness is also via valuations. With η fixed, the ideal (u ) records, at each Ps , whether s = ηs , or
differs in one direction or the other. Thus different ’s give different principal ideals (u ), hence different u .
So
                                                           2tdj
                                                  |Uj | ≥        .
                                                          h(Kj )
If the class-number bound gives h(Kj ) ≤ H dj , then

                                    |Uj | ≥ exp(γdj ),         γ = t log 2 − log H.

Choose ` so that γ > 0.
  Embed Kj into Cdj by choosing one embedding from each conjugate pair. Let

                                                   Λj = q −2 OKj

under this Minkowski embedding. For a radius R > 1/2, let

                                                  Y
                                                  dj
                                           WR =         {z ∈ C : |z| ≤ R}.
                                                  r=1

Every u ∈ Uj is a vector in Λj whose coordinates all have modulus 1.
   Average over translates y + Λj . Put

                                              Xy = (y + Λj ) ∩ WR .

For a fixed direction u, the expected number of x ∈ y +Λj with x, x+u ∈ WR is the volume of WR ∩(WR −u)
                                                                                d
divided by covol Λj . Since each coordinate shift has length 1, this volume is aRj , where aR is the area of
overlap of two radius-R disks whose centers are distance 1. Meanwhile vol WR = (πR2 )dj . If
                                                              aR
                                                    cR =         ,
                                                             πR2
then cR → 1 as R → ∞.
   Thus
                                                             (πR2 )dj
                                                Ey |Xy | =
                                                             covol Λj
and, for the directed count Dy ,
                                                                       d
                                                            |Uj |aRj
                                                Ey D y =             .
                                                           covol Λj
Consequently some translate satisfies
                                                               d
                                                Dy ≥ |Uj |cRj |Xy |.
Choose R fixed so large that log cR > −γ/2. Then for this translate,

                                                 Dy ≥ eγdj /2 |Xy |.

    This is a coset y + Λj , not necessarily the lattice itself. The points in the coset are not algebraic numbers
if y is arbitrary. That is harmless: the planar points can be arbitrary complex numbers. Only differences
need to be in Λj , and adding u ∈ Λj preserves the coset.


                                                          68
   Project Xy to the first complex coordinate. This projection is injective on the coset: if two coset points
have the same first coordinate, their difference is an element of Λj ⊂ Kj whose first embedding is zero; an
embedding of a field is injective, so the difference is zero. Let Pj be the projected set. Then |Pj | = |Xy |,
and every directed pair counted by Dy projects to a directed planar unit-distance pair, because the first
coordinate of u has modulus 1. An unordered edge can be counted at most twice, once for each orientation
u and −u. Therefore
                                                  1        1
                                         ν(Pj ) ≥ Dy ≥ |Pj |eγdj /2 .
                                                  2        2
    Convert dj to |Pj | using a uniform packing bound. If 0 6= λ ∈ q −2 OKj , then q 2 λ is a nonzero algebraic
integer, hence
                                                           Y
                                                           dj
                                      1 ≤ |NKj /Q (q λ)| =
                                                    2
                                                              |σr (q 2 λ)|2 .
                                                              r=1
                                          −2
If all coordinates of λ had modulus < q        , this product would be < 1. Thus

                                                    kλk∞ ≥ q −2 .

So the points of Xy are q −2 -separated in the sup norm of Cdj . A crude packing of the polydisk WR gives

                                           |Xy | ≤ (CRq 2 )2dj = eBdj ,

where B is fixed after R, q are fixed.
   Therefore
                                             1              1
                                     ν(Pj ) ≥ |Pj |eγdj /2 ≥ |Pj |1+γ/(2B)
                                             2              2
up to absorbing the constant for large j. More carefully, the packing gives eγdj /2 ≥ |Pj |γ/(2B) . Also |Pj |
must go to infinity along the tower: otherwise the lower bound Dy ≥ eγdj /2 |Xy |, together with the trivial
Dy ≤ |Xy |2 , would be impossible for bounded |Xy |. So after discarding finitely many j, ν(Pj ) ≥ |Pj |1+δ for
some fixed δ > 0. Then any proposed exponent 1 + C/ log log n is eventually smaller than 1 + δ along this
sequence.
    Could h(Kj ) be forced to be at least 2tdj , because all these split primes create independent relative ideal
classes? If so the analytic upper bound would conflict with the marked tower. But split unramified primes
in Kj /Fj do not automatically create class group rank. The classes of P/cP can have many relations; those
relations are exactly the norm-one S-units being manufactured. There is no genus-theory lower bound of
size tdj ; the only ramified finite primes in Kj /Fj are over 2. So no immediate contradiction.
    Two different algebraic directions also cannot have the same planar direction. If their first embeddings
agree, the elements of Kj agree.
    The marked pro-2 tower construction could be too optimistic. Killing Frobenius elements in Φ(G) adds
relations of degree at least two. The crude Golod-Shafarevich threshold r < d2 /4 is exactly designed for
that. For p = 2 and totally real or narrow towers there are local real-place issues, but the group already
forces real places to split. The Shafarevich bound may have an extra +1 or +r1 ; for a real quadratic base
this is negligible compared with ρ2 . Taking t = ρ2 /50 leaves a margin.
    For the principal-prime condition, a rational prime splitting completely in the narrow Hilbert class field
gives narrow principal prime ideals in F . Its Frobenius in the maximal abelian narrow unramified extension
is identity, not merely a square. Thus in the pro-2 tower group it is in the commutator.
    The fields Fj need not be Galois over Q. That does not matter. If a prime ideal of F is killed in the
quotient, it splits completely in every finite layer over F . Since the rational prime also splits in F , it has dj
degree-one primes in Fj . And since p ≡ 1 (mod 4), each splits in Fj (i).
    The root discriminant of Kj remains controlled. The relative discriminant of adjoining i divides 4OFj .
In degree 2dj ,
                           rd Kj = rd Fj · NFj /Q (dKj /Fj )1/(2dj ) ≤ rd F · 41/2 = 2 rd F.
   The class-number estimate remains the major point. The earlier attempt used

                                                 κK ≤ (s − 1)ζK (s)


                                                         69
at s = 2, or something like ζ(2)n . But that inequality is not obviously true. For a positive Dirichlet series
with residue κ, the value at s = 2 can miss a residue that only appears after a huge range. More concretely,
an artificial Dirichlet series whose coeﬀicients vanish until enormous X and then have density κ would have
small value at 2. Number fields have discriminant constraints, but the naïve positivity argument does not
prove it.
    A genuine residue bound is needed. A Landau/Stark/Louboutin bound has the shape
                                                                 n−1
                                                       e log DE
                                            κE ≤
                                                       2(n − 1)

for a degree n > 1 number field E, perhaps up to an absolute constant or with small exceptional cases. This
is exactly what is needed. If DE ≤ An , then log DE /(n − 1) ≤ O(log A), so κE ≤ (C log A)n , exponential in
n. Combining with Friedman and the analytic class number formula gives

                                                   hE ≤ C A
                                                          n
                                                            ,

with log CA = O(log A + log log A). In this application A = 2 rd F , so log CA = O(` log `), still dominated
by t  `2 .
   The division by n in that Landau bound is essential. A weaker bound κE ≤ (C log DE )n would be fatal
here, because for bounded root discriminant it gives roughly (Cn)n , and then the class number could have
an nn factor. The factorial or degree normalization is essential. The relevant Louboutin form is
                                                                       n−1
                                                             e log dK
                                      Ress=1 ζK (s) ≤                          .
                                                             2(n − 1)

It uses the functional equation and is standard. The upper half of Brauer-Siegel for bounded root discriminant
should be easy or known, and this is one expression of it. Still, other Stark bounds look like c(log D)n−1
without the factorial. The sharpened version is the one required; the exponential class-number control rests
on the bound for κK .
    The residue bound that would do the job is
                                                                 n−1
                                                       e log dK
                                            κK ≤
                                                       2(n − 1)

for n = [K : Q] ≥ 2. This is the Louboutin-type explicit upper bound for residues of Dedekind zeta functions.
It has exactly the factorial saving needed, hidden in the (n − 1)!-scale. Quick sanity checks: for K = Q it
is not meant to apply; for quadratic D large it says residue  log D, which is in the right range; for high
degree and bounded root discriminant it gives something exponential in degree, not worse. Together with
Friedman’s lower bound for the regulator, the analytic class-number formula should give

                                               h(K) ≤ H [F :Q]

for K = F (i) in a fixed root-discriminant family, with log H = O(log A + log log A) if A bounds the root
discriminant.
    Choosing Hilbert class field layers of the Kj themselves would not avoid reliance on this class-number
upper bound. That would move the field and the prime splitting in a way that seems to reintroduce the same
class-group cost. The clean construction keeps Kj = Fj (i), uses bounded root discriminant and growing
degree, and applies a general class-number estimate. It does not matter if the tower is not normal over Q.
The residue bound is for arbitrary number fields.
    The marked Golod-Shafarevich step also withstands a direct check. Suppose G is the narrow unramified
pro-2 tower group over the real quadratic base F . If k Frobenius elements corresponding to marked primes
are killed, a presentation gets k extra normal relations. The quotient has the same generator rank provided
those Frobenius elements are in the Frattini subgroup. For a narrow principal prime, the image in the full
abelianization is trivial, so certainly the mod-2 abelianization sees zero. Thus they are in Φ(G). One relation
per base prime ideal is enough: in every extension, all conjugate primes split if the base Frobenius is killed
in the Galois group. No relations are needed for all primes in all layers.


                                                        70
   If a base prime is actually principal, its Frobenius is identity in the maximal abelian unramified extension,
but not necessarily identity in the full nonabelian tower. That is exactly why the element is killed in G.
Since it is in the commutator or Frattini subgroup, the generator rank stays ρ, and relation rank increases
by at most one.
   For the base field, use genus theory cautiously. If

                                                 p                        Ỳ
                                       F` = Q(       D` ),         D` =         ra ,
                                                                          a=1

with ra ≡ 1 (mod 8), then narrow 2-class rank should be ` − 1. Units and signatures can make ordinary
and narrow differ, so the safe version is ρ ≥ ` − 2, while narrow genus theory gives the sharper statement
directly. Either way it is linear in `, enough.
    Also log D` = O(` log `) is needed. If the first ` primes 1 mod 8 are used, this follows from the prime
number theorem in AP. Without it, an elementary choice might give O(`2 ), and then the constants in the
entropy comparison are less automatic. PNT/AP is standard, so use it.
    The numerical comparison is clear. Let ρ = d2 Cl+ (F` ), choose

                                                   t = bρ2 /50c

rational marked primes, hence 2t marked prime ideals of F` . Shafarevich gives something like

                                                  r(G) ≤ ρ + 4

for this real quadratic narrow tower group. The quotient after marking has at most ρ + 4 + 2t relations. For
large ρ,
                                             ρ + 4 + 2t < ρ2 /4,
so Golod-Shafarevich leaves an infinite quotient.
   Then Fj are finite layers of that quotient. All are totally real, unramified over F` , and the chosen rational
primes split completely. Put Kj = Fj (i). Since the relative discriminant of adjoining i divides (4),

                                              rd(Kj ) ≤ 2 rd(F` ).

Let dj = [Fj : Q]. The class-number bound gives

                                           log h(Kj )/dj = O(` log `).

Meanwhile the sign choices over the t rational primes give m = tdj conjugate prime-pairs in Kj , so after
pigeonholing in the class group there are at least

                                                         2tdj
                                                        h(Kj )
same-class sign ideals. The exponent per dj is

                                                 t log 2 − log H` ,

and since t  `2 while log H` = O(` log `), choose ` once and for all so that

                                           γ := t log 2 − log H` > 0.

   The marked rational primes themselves may be enormous. That only enters through the fixed denomi-
nator
                                                 Yt
                                             q=     pb
                                                             b=1

and therefore through the eventual packing constant. No upper bound for q is needed; finiteness is enough.
Chebotarev gives infinitely many primes splitting completely in the compositum of the narrow Hilbert class
field and Q(i), so there is that freedom.


                                                             71
      For each marked rational pb , in Kj there are dj conjugate pairs

                                                       {Ps , cPs }

above it, because pb splits completely in Fj and also in Fj (i). For  ∈ {0, 1}m , define
                                                 Y       Y
                                            A =     Ps       cPs .
                                                       s =1        s =0

Take a large fibre of the map  7→ [A ] ∈ Cl(Kj ), fix η in that fibre, and for each  in the fibre choose α with

                                                  (α ) = A A−1
                                                              η .

Set
                                                  u = α /c(α ).
      For every embedding σ : Kj → C, since Kj is CM and c is complex conjugation over the real subfield,

                                                  σ(cα) = σ(α).

So
                                                       |σ(u )| = 1.
This is independent of how huge α is archimedeanly.
   The denominator: the valuation of (u ) at Ps is 2(s − ηs ), hence belongs to {−2, 0, 2}. No other primes
occur. Thus
                                               q 2 u ∈ O K j .
The exponent 2 is the safe one; q would not clear the possible −2 valuations.
    Distinctness: the valuation vector of (u ) at the Ps ’s recovers  relative to fixed η. Thus different ’s give
different principal ideals (u ), hence different elements.
    For the geometric construction, let
                                                   Λj = q −2 OKj
under the Minkowski embedding, but choose one complex embedding from each conjugate pair, so Λj ⊂ Cdj .
Each u ∈ Uj lies in Λj and has modulus 1 in every coordinate.
   Take the product window
                                  WR = {(z1 , . . . , zdj ) : |zr | ≤ R ∀r}.
For a coset y + Λj , put Xy = (y + Λj ) ∩ WR . The points of the coset are not themselves algebraic if y is
arbitrary, but that is harmless: differences lie in Λj , and unit translations are lattice vectors.
   Average over the torus Cdj /Λj . If bR = πR2 and aR is the area of intersection of two radius-R disks
whose centers are distance 1, then
                                                              d
                                                             bRj
                                               E|Xy | =
                                                          covol(Λj )
and the directed count
                                    Dy = #{(x, u) : u ∈ Uj , x, x + u ∈ Xy }
has average
                                                                       d
                                                                |Uj |aRj
                                                EDy =                     .
                                                               covol(Λj )
Therefore for some coset,
                                                   d
                                       Dy ≥ |Uj |cRj |Xy |,            cR = aR /bR .
Since cR → 1, choose R so large that log cR > −γ/2. Then for the good coset

                                                 Dy ≥ eγdj /2 |Xy |.


                                                               72
     This averaging argument is not vacuous. Even if the expected number of vertices were small, the ratio-of-
integrals argument gives a coset with D/V at least the average ratio, as long as the integral of V is positive.
If D/V is huge and counts are integral, then V is automatically huge too, because a directed graph on V
vertices has at most V (V − 1) directed edges. In practice the lattice is very dense anyway: scaling by q −2 in
degree 2dj multiplies covolume by q −4dj , so expected vertex count is exponential for fixed R once q is fixed.
     Project Xy to the first complex coordinate. Projection is injective on a coset of Λj : if two points have the
same first coordinate, their difference is an element of Kj whose first embedding is zero, hence the element
is zero. Thus Pj = π1 (Xy ) has |Pj | = |Xy |. Each directed pair counted by Dy becomes an ordered planar
unit-distance pair because |π1 (u)| = 1.
     Could the same unordered edge be counted many times by different u’s? If the projected ordered difference
is fixed, then the first embedding of u − v is zero. Since u − v ∈ Kj , that forces u = v. For the opposite
orientation there is the usual factor 2. So unordered unit edges are at least Dy /2.
     For the packing bound, if nonzero λ ∈ Λj , then q 2 λ is a nonzero algebraic integer. Hence

                                                                   Y
                                                                   dj
                                          1 ≤ |NKj /Q (q 2 λ)| =         |σr (q 2 λ)|2 .
                                                                   r=1

Thus
                                                  max |σr (λ)| ≥ q −2 .
                                                    r
                               −2
So points of any coset are q        -separated in sup norm on Cdj . A crude packing of WR gives

                                               |Xy | ≤ (CRq 2 )2dj = eBdj

for fixed B.
    Combining the good-coset inequality and projection,
                                                            1
                                                 ν(Pj ) ≥     |Pj |eγdj /2 .
                                                            2
Since |Pj | ≤ eBdj , this gives
                                                  eγdj /2 ≥ |Pj |γ/(2B) .
After absorbing the factor 1/2 for large j,

                                                    ν(Pj ) ≥ |Pj |1+δ

for some fixed δ > 0, say δ = γ/(4B). Also |Pj | → ∞: otherwise the lower bound on edges would eventually
exceed the trivial quadratic upper bound.
    The class-number estimate has the needed form. For a number field E of degree N , discriminant D, root
discriminant A, Louboutin gives
                                                           N −1
                                                    e log D
                                          κE ≤                    .
                                                   2(N − 1)
Since log D ≤ N log A, this is ≤ (e log A)N , after harmless adjustment. Friedman gives
                                                                     ′
                                                    RE /wE ≥ cec N

in the coarse form needed here. The analytic class number formula then yields

                                                hE ≤ (CA1/2 log A)N .
                                         1/2                                                            √
For E = Kj , N = 2dj , so set H` = (CA` log A` )2 . Its logarithm is log A` + O(log log A` ), and A` ≤ 2 D` ,
so log H` = O(` log `).
    A hidden obstruction in the tower would have to come from the splitting setup. The selected rational
primes split completely in the narrow Hilbert class field of F , hence the prime ideals over them are narrow
principal. They also split in Q(i), so p ≡ 1 mod 4. In the marked quotient of G, kill the Frobenius at both


                                                            73
prime ideals over each rational p. Since the quotient is infinite, finite quotients with degrees tending to
infinity exist. The corresponding Fj are Galois over F , though not necessarily over Q. Kj = Fj (i) is CM
by definition: a totally imaginary quadratic extension of the totally real field Fj . No normality over Q is
needed anywhere.
    Does adjoining i remain linearly disjoint? Since Fj is totally real, it cannot contain i, so [Kj : Fj ] = 2.
At a selected prime p, because p ≡ 1 mod 4 and the prime of Fj has residue field Fp , x2 + 1 splits; so the
prime splits into the conjugate pair in Kj .
    Could a principal prime have Frobenius identity in the entire tower already? Maybe sometimes; then
adding the relation is redundant. That only helps. The GS count is an upper bound on added relations.
    Could class numbers be bounded instead by using an Odlyzko argument on Hilbert class fields? No; if
the root discriminant bound A is large, Odlyzko does not bound the Hilbert class field degree. The analytic
class formula route is the right general upper bound here.
    A geometric sanity check remains: all the planar points lie in the fixed disk |z| ≤ R. Is there a theorem that
a bounded region forces near-linear unit distances? I do not know one, and the standard incidence bounds
do not improve merely from bounded diameter when points can be arbitrarily close. The construction uses
exponentially many exact unit directions and very dense model sets; boundedness is not itself a contradiction.
    For consistency with known n4/3 -type upper bounds, the final δ must be small. Since B includes roughly
4 log q, and the marked primes can be large, δ can be as small as desired while positive. The negative
resolution only needs some positive δ.
    The quantifier check is straightforward. Once there is an infinite sequence with
                                                 ν(Pj ) ≥ |Pj |1+δ
and |Pj | → ∞, then for any proposed C, N , choose j so large that |Pj | ≥ N and C/ log log |Pj | < δ. Then
                                     ν(|Pj |) ≥ ν(Pj ) > |Pj |1+C/ log log |Pj | .
So the proposed upper bound fails.
    The constants can stay conservative: use ρ ≥ ` − 2, t = bρ2 /50c, relation bound ρ + 4, and choose ` large
enough that t log 2 − log H` > 0.
    One possible flaw is the passage from the high-dimensional lattice coset to an actual finite set of distinct
planar points. Suppose P is obtained by projecting a coset of the Minkowski lattice. Could there be many
lattice points in the window with the same first coordinate? No: if ` ∈ K has σ1 (`) = 0, then ` = 0, since
σ1 is a field embedding. For two points in the same coset, equality of first coordinates says their difference
has first embedding 0, hence the difference is 0. So projection is injective. This remains true although the
coset itself need not consist of algebraic points; the differences are in the lattice.
    Also, when x, x + u are in the full product window, their first-coordinate projections are indeed at
Euclidean distance 1, because |σ1 (u)| = 1. They may lie anywhere in the projected disk of radius R; that is
fine. Directed pairs: if both u and −u occur, an undirected edge is counted twice. Could it be counted more
often by different algebraic directions with the same first coordinate? No, again by injectivity of σ1 on K.
So the eventual division by 2 is safe.
    The packing/product-formula step for the lattice
                                                      L = q −2 OK
is consistent. If λ ∈ L \ {0}, then q 2 λ ∈ OK \ {0}, so
                                                                Y
                                                                d
                                       1 ≤ |NK/Q (q 2 λ)| =           |σr (q 2 λ)|2 .
                                                                r=1

Thus
                                                Y
                                                d
                                                      |σr (λ)| ≥ q −2d ,
                                                r=1

and therefore some coordinate has modulus at least q −2 . Hence the lattice points in any translate are
q −2 -separated in the sup norm on Cd . A packing bound in the product of radius-R disks gives
                                                |Xy | ≤ (CRq 2 )2d .


                                                           74
The exponent 2d is the real dimension.
   The averaging over cosets is also consistent. The boundary of the product of disks has measure zero.
For a fixed u whose coordinates all have modulus 1, the intersection volume WR ∩ (WR − u) is exactly adR ,
where aR is the overlap area of two radius-R disks whose centers are distance 1. The window volume is bdR ,
bR = πR2 . Thus the ratio is cdR , with cR = aR /bR → 1. Once there is a positive arithmetic exponent γ,
choose R so that log cR > −γ/2. Increasing R only changes the final packing constant B, not the positivity.
   The number-theory loss needs to be exponential with a constant whose logarithm is only O(` log `). An
elementary route avoids analytic class number formula, residue bounds, and regulator lower bounds.
   Claim: if E is degree N and root discriminant ≤ A, then

                                                 h(E) ≤ C(A)N

with log C(A) = O(log A + log log A).
   Minkowski says every ideal class contains an integral ideal of norm at most
                                                             N! p
                                           ME = (4/π)r2           |DE |.
                                                             NN
Crude is enough:                                       √
                                                ME ≤ (C A)N .
Call this bound X.
   Then count integral ideals of norm ≤ X. If aE (m) is the number of ideals of norm m, then coeﬀicientwise

                                                aE (m) ≤ dN (m),
                                                                                  Q            fi −1
the N -fold divisor function. Locally, the Euler factor for a rational prime is       i (1−x    )      , and its coeﬀicients
are bounded by those of (1 − x)−N . Multiplicativity gives the inequality.
   So                                                  X
                                              h(E) ≤         dN (m).
                                                       m≤X

The factorial saving in this divisor summatory function is needed, not the crude X(log X)N . Let

                              SN (X) = #{(a1 , . . . , aN ) ∈ NN : a1 · · · aN ≤ X}.

By induction,
                                                         (1 + log X)N −1
                                        SN (X) ≤ C N X                   .
                                                            (N − 1)!
Indeed                                                X
                                           SN (X) =          SN −1 (X/a),
                                                      a≤X

and the sum of
                                             a−1 (1 + log(X/a))N −2

                             √ the integral, giving the factor 1/(N − 1).
is bounded by a constant times
    In the application X = (C A)N , so log X = βN with β = O(1 + log A). Stirling gives

                                        (1 + log X)N −1
                                                        ≤ (C(1 + β))N .
                                           (N − 1)!

Thus                                               √
                                          h(E) ≤ [C A(1 + log A)]N
up to changing C. No regulator/residue caveat remains.
   Apply this to Kj = Fj (i). If dj = [Fj : Q], then [Kj : Q] = 2dj , and

                                               rd(Kj ) ≤ 2 rd(F ),


                                                        75
because the relative discriminant of adjoining i divides (4). Hence
                                                                 d
                                                 h(Kj ) ≤ H` j ,

where log H` = O(` log `) for the base quadratic field chosen below.
  Now compare the scales. Pick a real quadratic

                                                p                       Ỳ
                                       F = Q(       D` ),        D` =         rν ,
                                                                        ν=1

with rν ≡ 1 (mod 8) small. Then genus theory gives

                                             ρ = d2 Cl+ (F ) ≥ ` − 1,

and
                                                     1
                                      log rd(F ) =     log D` = O(` log `).
                                                     2
Let
                                                    t = bρ2 /50c
or any suﬀiciently small constant multiple of ρ2 . Then

                                                    t log 2  `2

while log H` = O(` log `). So for large `

                                            γ := t log 2 − log H` > 0.

This is the decisive inequality.
    The marked tower uses those t rational primes. The order matters: first choose F with large narrow
2-class rank, then choose the rational primes. Choose p1 , . . . , pt so that pb ≡ 1 (mod 4) and the primes of
F above pb are narrow principal. Rational primes splitting completely in the compositum of the narrow
Hilbert class field of F with Q(i) do this; Chebotarev gives infinitely many.
    For the Golod-Shafarevich marking, let G be the Galois group of the maximal pro-2 extension of F
unramified at finite primes and split at the real places. Its generator rank is ρ, and the Shafarevich relation
bound is r(G) ≤ ρ + O(1); for a real quadratic one may write ρ + 4 safely. The Frobenius elements of the
selected prime ideals are trivial in the abelianization, because the primes are narrow principal; in a minimal
pro-2 presentation they lie in the Frattini subgroup. Quotient by the normal closures of those Frobenius
elements. There are 2t base prime ideals over the t rational primes, so at most 2t added relators. The
generator rank remains ρ. If
                                               ρ + 4 + 2t < ρ2 /4,
Golod-Shafarevich makes the quotient infinite. With the constant 1/50 this is fine for large ρ.
   Thus there is an infinite tower
                                        F = F0 ⊂ F1 ⊂ F2 ⊂ · · ·
of totally real unramified 2-extensions, with dj = [Fj : Q] → ∞, root discriminant fixed, and all selected
rational primes splitting completely in every Fj . The finite layers are taken from this quotient; splitting is
built in.
    For the sign ideals, in Kj = Fj (i), each prime of Fj above pb splits into a conjugate pair

                                                     Ps , cPs ,

because pb ≡ 1 (mod 4) and has residue field Fpb . The number of pairs is

                                                     m = tdj .



                                                            76
For each sign vector  ∈ {0, 1}m , define
                                                        Y
                                                A =         Pss (cPs )1−s .
                                                         s

All have the same norm q dj , where
                                                               Y
                                                               t
                                                         q=          pb .
                                                               b=1

      Map these 2m ideals into Cl(Kj ). A fibre has size at least

                                                2m /h(Kj ) ≥ exp(γdj ).

Fix one fibre Ej , and fix a base sign vector η ∈ Ej . For every  ∈ Ej , choose α with

                                                    (α ) = A A−1
                                                                η .

Then set
                                                                α
                                                        u =          .
                                                               c(α )
   This fixed-basepoint fibre construction is important. The tempting ”take all pairs in the fibre” would
suggest a squared count, but different pairs can have the same coordinatewise difference pattern. Fixing η
gives the clean lower bound 2m /h, and it is enough.
   The required properties follow. For every complex embedding σ,

                                                     σ(cα) = σ(α)

since c is the CM involution. Therefore
                                                        |σ(u )| = 1.
At a chosen prime Ps , the valuation of (u ) is

                                                2(s − ηs ) ∈ {−2, 0, 2},

and similarly at the conjugate prime with opposite sign. Hence

                                                        q 2 u ∈ O K j .

Also this valuation vector determines  relative to η, so the u ’s are distinct.
   The geometric lemma takes the needed form. Choose one embedding from each conjugate pair of Kj , so
the Minkowski space is Cdj , and embed
                                                Λj = q −2 OKj .
Let
                                                    Y
                                                    dj
                                            WR =          {z ∈ C : |z| ≤ R}.
                                                    r=1

For a coset y + Λj , let
                                                Xy = (y + Λj ) ∩ WR .
Average over the torus Cdj /Λj . If Dy is the number of directed incidences x, x + u ∈ Xy with u ∈ Uj , then
                                                    d                                 d
                                                  bRj                            |Uj |aRj
                                     E|Xy | =            ,              EDy =             .
                                                covol Λj                        covol Λj

Therefore some coset satisfies
                                                                    d
                                                  Dy ≥ |Uj |cRj |Xy |.



                                                               77
Choose R with log cR > −γ/2. Then for that coset

                                               Dy ≥ eγdj /2 |Xy |.

   Project this Xy to the first coordinate and call the planar set Pj . Projection is injective, so nj = |Pj | =
|Xy |. Each directed incidence becomes an ordered unit-distance pair in the plane, and unordered edges lose
at most a factor 2:
                                                 1        1
                                         ν(Pj ) ≥ Dy ≥ nj eγdj /2 .
                                                 2        2
   The packing estimate gives
                                           nj ≤ (CRq 2 )2dj = eBdj
with B fixed after F , the marked primes, and R are fixed. Therefore
                                                            γ/(2B)
                                               eγdj /2 ≥ nj          .

Absorb the factor 1/2 by taking j large; get

                                                 ν(Pj ) ≥ n1+δ
                                                           j

for some fixed δ > 0, say δ = γ/(4B).
    It remains to justify nj → ∞. It follows from the same edge lower bound and the trivial inequality
ν(Pj ) ≤ n2j : if nj stayed bounded, then 21 nj eγdj /2 would eventually exceed n2j . Equivalently nj ≥ ceγdj /2
along the selected cosets. So log log nj → ∞.
    Then the quantifier conclusion is straightforward. Given any proposed C and N , choose j so large that
nj ≥ N and
                                                C/ log log nj < δ.
Then
                                                              1+C/ log log nj
                                       ν(nj ) ≥ ν(Pj ) > nj                     .
So the proposed Erdős upper bound fails. In fact the construction gives a fixed polynomial excess along a
sequence.
    A few possible hidden problems remain.
    Could Kj = Fj (i) fail to have degree 2dj ? No, Fj is totally real, so it does not contain i. Could the
selected pb ramify in Kj ? No: choose them odd and away from the discriminant; Kj /Fj is only ramified over
2, since the relative discriminant divides (4). Could a rational prime splitting completely in Fj fail to split
in Kj ? If pb ≡ 1 (mod 4), then x2 + 1 splits over the residue field Fpb at every prime, so each prime splits.
    Could the narrow Hilbert class field condition be overkill or wrong? Only triviality of the prime ideals of
F in the relevant 2-class group is needed, i.e. Frobenius in the abelianization of G is trivial. Narrow principal
is enough. Rational primes splitting completely in the narrow Hilbert class field ensure that. Adjoining i in
the Chebotarev condition enforces p ≡ 1 (mod 4).
    Could forcing those primes to split through the tower add infinitely many relations, one for every conjugate
in every layer? No. The infinite extension is defined over the base F . Killing the decomposition/Frobenius
element of a base prime ideal makes that base prime split completely in the corresponding quotient extension.
One normal-closure relation per base prime ideal is the group-theoretic operation; conjugates are already
killed by normal closure. Since F/Q has two primes over each rational pb , kill both.
    Could quotienting by those Frobenius elements reduce the generator rank? Since the primes are principal,
the Frobenius elements are trivial in Gab , hence in the Frattini subgroup. Quotienting by a normal subgroup
contained in the Frattini subgroup preserves the Frattini quotient. So the generator rank stays ρ.
    The class number bound is solid in this form. It applies to all fields of bounded root discriminant; no
regulator lower bound is needed. For Kj , the degree in the lemma is 2dj , so the constant H` may be squared
relative to C(A), but that is harmless and still has logarithm O(` log `).
    One geometric subtlety: the coset chosen by averaging may have points that are not algebraic. That
is allowed; the problem asks for arbitrary real points. The directions are algebraic lattice elements, and
differences of points in the same coset are in the lattice. Projection injectivity uses only differences.


                                                       78
    Another possible worry is that all planar points lie in a fixed disk of radius R. Does a bounded planar
region impose some near-linear upper bound on unit distances? No, not without a separation assumption.
Points can be arbitrarily close, and the standard unit-distance problem already allows this. The high-
dimensional lattice window projects to a very dense, highly non-separated planar set. The crossing lemma or
incidence bounds do not suddenly become stronger merely because the whole configuration sits in a bounded
disk; crossings can be arbitrarily close and the usual O(n4/3 ) is global anyway.
    The usual crossing-lemma picture stays separate from this argument. Straight unit segments in these
projected model sets can be wildly degenerate; many edges can overlap almost entirely, and many crossings
can occur at the same point. The standard crossing-lemma proof of the n4/3 upper bound has to handle
degeneracies by perturbation or by known unit-distance arguments. None of that is used here. The graph is
simple after projection, and the average degree obtained is only nδ with a small fixed δ. No crossing-lemma
assumption enters.
    The tower part needs one more real-place check. The desired quotient of the narrow unramified 2-tower
has a prescribed finite set T of finite primes split
                                                √ completely. Is it still infinite after imposing that all real
places split? For a real quadratic base F = Q( D), with D a product of positive prime discriminants, genus
theory gives many quadratic unramified extensions. But are they totally real? The genus extensions look
like                                                    p
                                                     F ( d1 )
where D = d1 d2 is a factorization into fundamental discriminants. √ If every prime discriminant is positive –
for instance all q ≡ 1 (mod 8) – then d1 > 0 and d2 > 0. So F ( d1 ) is totally real. The large genus-theory
2-rank is really visible in the narrow class group, not only in an ordinary class group with complexifying
quadratic extensions.
    Higher in the tower, some ordinary unramified extensions might become complex, but the maximal
extension under consideration is unramified at finite primes and split at all real places. The narrow Hilbert
2-class field is the first abelian layer. The standard Shafarevich relation bound for this narrow group should
be enough. The usual criterion says that if the 2-rank of Cl+ (F ) is large compared with the number
of imposed split primes and the number of archimedean places, the marked narrow tower is infinite. A
delicate Koch-Venkov theorem is unnecessary; the coarse Golod-Shafarevich inequality with a Shafarevich
presentation bound has huge slack.
    The group-theory count can be off by a generator, so fix it explicitly. Let G be the Galois group of the
maximal pro-2 extension of F unramified at finite primes and totally split at infinity. Then

                                                      Gab

is the 2-primary narrow class group, so d(G) = ρ = d2 Cl+ (F ). Shafarevich gives something like

                                                 r(G) ≤ ρ + 4

for a real quadratic base; the exact constant is irrelevant.
    Choose the marked finite prime ideals to be narrow principal in F . Then their Frobenius classes are trivial
in Gab . Equivalently, each chosen Frobenius representative lies in the Frattini subgroup Φ(G). Quotienting
G by the closed normal subgroup generated by these Frobenius elements imposes complete splitting at those
primes. Since elements of the Frattini subgroup were killed, the generator rank remains ρ. Since each element
is added as one pro-2 relator, the relation rank increases by at most the number of marked prime ideals.
There is no extra infinite family of relators: in a group presentation, adding one word means adding its
closed normal closure.
    So if the number of rational primes is t, hence the number of prime ideals of the real quadratic base is
2t, the quotient Ḡ has
                                       d(Ḡ) = ρ,     r(Ḡ) ≤ ρ + 4 + 2t.
If                                                        
                                                 t = ρ2 /50 ,
then for large ρ,
                                              ρ + 4 + 2t < ρ2 /4.


                                                      79
At X = 2/ρ, the Golod-Shafarevich polynomial

                                                  1 − ρX + rX 2

is negative under that inequality. Hence the quotient is infinite. Killing Frobenius elements gives an actual
subextension of the original global extension; it is not a formal marked fundamental group detached from
fields. Splitting holds because the Frobenius is trivial in the quotient.
    The chosen rational primes also need to be principal in the narrow sense. The clean way is to take
rational primes splitting completely in a finite Galois extension containing the narrow Hilbert class field of
F and Q(i). Then each prime ideal of F above such a rational prime is narrow principal, and the rational
prime is 1 mod 4. Chebotarev gives infinitely many; no size bound is needed here.
    For the class-number estimate, define dN (m) as the N -fold divisor function, the coeﬀicient of ζ(s)N . For
a degree N number field E, the number aE (m) of integral ideals of norm m is coeﬀicientwise bounded by
dN (m), because each local Euler factor is bounded by the local factor of ζ(s)N . Minkowski gives an integral
ideal representative of each class of norm              √
                                                  ≤ (C A)N
when rd(E) ≤ A. Thus                        X                            √
                                   h(E) ≤         dN (m),          X = (C A)N .
                                            m≤X

Then use the elementary bound
                                     X                          (1 + log X)N −1
                                          dN (m) ≤ C N X                        .
                                                                   (N − 1)!
                                    m≤X


Since log X = OA (N ), Stirling turns this into C(A)N , with log C(A) = O(log A + log log A). For Kj = Fj (i),
N = 2dj and A ≤ 2 rd(F ), so
                                                             d
                                                 h(Kj ) ≤ H` j ,
                                        √
where log H` = O(` log `) once F = Q( D` ) is built from ` small primes 1 mod 8. This is enough to beat by
t log 2, because t  `2 .
    The discriminant line is consistent. The tower Fj /F is unramified at finite primes and totally real.
Therefore
                                                rd(Fj ) = rd(F ).
Then Kj = Fj (i) is a quadratic extension whose relative discriminant divides (4). Since [Kj : Q] = 2dj ,

                                        rd(Kj ) ≤ 2 rd(Fj ) = 2 rd(F ),

not 4 times.
   For the direction construction, each selected rational prime pb splits completely in every Fj , and because
pb ≡ 1 mod 4, every prime of Fj above pb splits in Kj = Fj (i). Thus over all b there are

                                                    m = tdj

conjugate pairs {Ps , cPs } of primes of Kj . For every sign vector  ∈ {0, 1}m , define
                                                   Y       Y
                                             A =     Ps      cPs .
                                                   s =1        s =0

Partition these 2m ideals by their class in Cl(Kj ), choose a largest fibre, and fix one η in it. The fibre has
size at least
                                                 2m /h(Kj ).
For each  in that fibre,
                                                     A A−1
                                                         η




                                                           80
is principal; choose α ∈ Kj× with
                                                    (α ) = A A−1
                                                                η ,

and set
                                                              α
                                                     u =           .
                                                             c(α )
   Three properties are needed: unit modulus at every embedding, common denominator, and distinctness.
   For modulus, because Kj = Fj (i), elements can be written as a+bi with a, b ∈ Fj . Under any embedding,
Fj goes into R and i goes to either i or −i. The involution c is complex conjugation in that embedding.
Hence
                                                     σ(α )
                                          |σ(u )| =        = 1.
                                                     σ(α )
      For denominators, compute the principal ideal of u . At the prime Ps ,

                                        vPs (u ) = 2(s − ηs ) ∈ {−2, 0, 2}.

At its conjugate the valuation is the negative. No other primes occur. If

                                                             Y
                                                             t
                                                      q=          pb ,
                                                            b=1

then qOKj is the product of all these primes and their conjugates, each once. Therefore q 2 clears all possible
−2 valuations:
                                                q 2 u ∈ O K j .
So u ∈ q −2 OKj . This q is fixed once and for all; it does not grow with j.
    For distinctness, the ideal (u ) has valuation vector 2(s − ηs ) at the Ps ’s. Since η is fixed, this recovers
. Thus different ’s give different principal ideals, hence different elements. The argument does not rely on
a squared fibre count; the fixed basepoint avoids the duplicate difference-pattern problem.
    The size of the direction set is therefore
                                              2tdj                             
                                   |Uj | ≥          ≥ exp (t log 2 − log H` )dj .
                                             h(Kj )
Let
                                                γ = t log 2 − log H` .
Because t is quadratic in the 2-rank and log H` is only O(` log `), choose ` large enough that γ > 0. After
that, everything – F , the marked primes, q, γ – is fixed, and only j varies.
   For the cut-and-project geometry, take the Minkowski embedding of

                                                    Λj = q −2 OKj

into Cdj , choosing one embedding from each conjugate pair. Take a product window

                                                    Y
                                                    dj
                                             WR =         {z ∈ C : |z| ≤ R}.
                                                    r=1

For a coset y + Λj , set
                                                Xy = (y + Λj ) ∩ WR .
The coset y is allowed to be arbitrary in C ; the points themselves need not be algebraic. Only differences
                                               dj

are in Λj , and that is what matters.
   For a direction u ∈ Uj , the embedded vector has length 1 in every complex coordinate. Let aR be the
area of overlap of two radius-R disks whose centers are distance 1, and let
                                                               aR
                                                     cR =         .
                                                              πR2

                                                            81
This does not depend on the argument of the shift. Also cR → 1 as R → ∞.
   Averaging over the compact torus Cdj /Λj gives
                                                Z
                                                                    (πR2 )dj
                                                     |Xy | dy =
                                                                   covol(Λj )

up to the chosen normalization, and for directed incidences

                                      Dy = #{(x, u) : x, x + u ∈ Xy , u ∈ Uj }

it gives
                                            Z                                d
                                                                       aRj
                                                Dy dy = |Uj |                  .
                                                                    covol(Λj )
Taking the ratio of integrals, some coset satisfies
                                                                   d
                                                    Dy ≥ |Uj |cRj |Xy |.

Choose R so large that
                                                      log cR > −γ/2.
Then for that coset,
                                                     Dy ≥ eγdj /2 |Xy |.
   Projection to the first complex coordinate must be injective. If two points in y + Λj have the same first
coordinate, their difference λ ∈ Λj ⊂ Kj has first embedding 0. A field embedding has kernel 0, so λ = 0.
Hence the projection gives a planar set
                                               Pj = π1 (Xy )
with |Pj | = |Xy |. Each directed incidence projects to an ordered pair of points at Euclidean distance 1,
because |π1 (u)| = 1. An unordered edge can be counted at most twice: once in each orientation. Indeed the
projected difference determines the algebraic difference by injectivity. Therefore
                                                          1     1
                                           ν(Pj ) ≥         Dy ≥ |Pj |eγdj /2 .
                                                          2     2
   The dj -exponential factor still has to become a power of |Pj |. A crude packing upper bound, not an
average size estimate, gives this. If 0 6= λ ∈ q −2 OKj , then q 2 λ is a nonzero algebraic integer, so

                                                                       Y
                                                                       dj
                                        1 ≤ |NKj /Q (q 2 λ)| =               |σr (q 2 λ)|2 .
                                                                       r=1

Thus
                                                    max |σr (λ)| ≥ q −2 .
                                                      r

So the lattice is q −2 -separated in the sup norm on Cdj . Packing small polydisks inside the product disk gives

                                             |Xy | ≤ (CRq 2 )2dj = eBdj

for a fixed B = 2 log(CRq 2 ), say.
    Then
                                                    eγdj /2 ≥ |Pj |γ/(2B) .
After absorbing the factor 1/2, for large j,

                                                      ν(Pj ) ≥ |Pj |1+δ

with, for example,
                                                      δ = γ/(4B) > 0


                                                              82
or, harmlessly, min(γ/(4B), 1/2). The sizes |Pj | must tend to infinity: otherwise the lower bound
                                                         1
                                              ν(Pj ) ≥     |Pj |eγdj /2
                                                         2
would eventually exceed the trivial O(|Pj |2 ) bound.
   Enormous selected primes are harmless. Their product q enters B; if Chebotarev gives only huge primes,
B becomes huge and δ tiny. But it is still a positive constant, because q is fixed before passing up the tower.
No effective Chebotarev estimate is needed.
   The quantifier comparison is straightforward. There is a sequence of planar point sets with nj = |Pj | → ∞
and
                                                 ν(Pj ) ≥ n1+δ
                                                           j

for a fixed δ > 0. Given any constant C, eventually

                                              C/ log log nj < δ/2,

and after also absorbing the fixed multiplicative constants,
                                                              1+C/ log log nj
                                        ν(nj ) ≥ ν(Pj ) > nj                    .

So the proposed universal upper bound fails along this sequence.
     The arithmetic still hinges on a short list of facts: genus extensions must be totally real; marked Frobenius
elements must lie in the Frattini subgroup; relation count increases only by the number of marked prime
ideals; q 2 , not q, is the safe denominator; all embeddings of α/cα have modulus 1; the first-coordinate
projection is injective; and the packing bound lives in the full Minkowski space, not in the plane.
     Several steps still need to match the precise arithmetic conventions.
     The arithmetic and the geometric averaging each have to be used in exactly the right range.
     The marked tower lemma starts with a real quadratic field with large 2-class rank, then forces a finite
list of primes to split completely in an infinite unramified pro-2 tower by killing their Frobenius elements. If
the primes have trivial narrow ideal class, then their Frobenius is trivial in the abelianization of the maximal
unramified pro-2 extension. So it lies in the Frattini subgroup. Killing such elements should not reduce
the generator rank; it only adds relations. Then Golod-Shafarevich can still prove infinitude provided the
number of added relations is below the quadratic margin.
     At this level it is plausible. Take F real quadratic with discriminant a product of ` primes 1 mod 8. The
narrow 2-rank is supposed to be about ` − 1. If t ∼ `2 /50 rational primes are marked, then there are 2t
primes of F above them. That is still below the d2 /4 Golod-Shafarevich threshold if d ∼ `. So the tower can
survive.
                                                                            Q field and also split in Q(i). Their
     Chebotarev chooses those t rational primes: split in a Hilbert-class-type
sizes can be enormous and depend badly on `. That only makes q = pb enormous. It will make the final
exponent tiny, but if it is fixed and positive, that is not fatal.
     In a finite layer Fj of the tower, set Kj = Fj (i). If each marked rational prime pb splits completely in Fj
and pb ≡ 1 mod 4, then in Kj each prime of Fj over pb splits into a conjugate pair. If dj = [Fj : Q], then for
each pb there are dj such conjugate pairs in Kj .
     For the class-group pigeonhole, every sign vector  choosing one prime from each conjugate pair defines
an ideal A . There are 2m such ideals, where m = tdj if dj = [Fj : Q]. Pigeonhole in Cl(Kj ): a fiber has size
at least 2m /h(Kj ). Fix one η in that fiber. For each  in the same fiber, choose α with

                                                 (α ) = A A−1
                                                             η .

Then put
                                                           α
                                                   u =
                                                          c(α )
where c is complex conjugation over Fj .
   The two key properties are archimedean modulus and denominator control. Since Kj = Fj (i) and Fj is
totally real, for every chosen complex embedding σ,

                                                 σ(cα) = σ(α).

                                                         83
So
                                                     |σ(u )| = 1.
     At a selected prime Ps , the valuation of u should be
                           vPs (u ) = (s − ηs ) − ((1 − s ) − (1 − ηs )) = 2(s − ηs ).

          Q valuations are at worst −2 at primes above the marked rational primes. Multiplying by q ,
                                                                                                   2
So the negative
where q = b pb , clears all denominators. Thus
                                                     q 2 u ∈ O K j ,
or u ∈ q −2 OKj .
    Distinctness? The valuation vector at the Ps ’s determines , relative to η. So distinct ’s give distinct
u’s.
    For the geometric part, embed K = Kj into
                                                       V = Cd
using one embedding from each conjugate pair. Here d = [K : Q]/2 = [Fj : Q]. Let
                                                     Λ = q −2 OK
in this Minkowski embedding. The directions u lie in Λ, and every coordinate has modulus 1.
    Take a window W , a product of disks of radius R. Average over aﬀine cosets y + Λ in V /Λ. For a random
y, set
                                             X = (y + Λ) ∩ W.
Because u ∈ Λ, translation by u preserves the coset. The expected number of points is
                                                              vol W
                                                    E|X| =           .
                                                             covol Λ
The expected number of directed pairs (x, x + u), with u in the direction set U , is
                                               X vol(W ∩ (W − u))
                                                                         .
                                                          covol Λ
                                              u∈U

Since every coordinate of u has modulus 1, the overlap is the same for every u: in each complex coordinate it
is the area of intersection of two radius-R disks whose centers are distance 1 apart. So the ratio of expected
directed edges to expected vertices is |U | times a fixed overlap ratio to the d-th power. If R is large enough,
that overlap ratio is close to 1, so it will not eat more than, say, half the exponential entropy of U .
    Projection to the plane: project X ⊂ Cd to the first coordinate. Is this injective on a coset? If two points
in y + Λ have the same first coordinate, their difference is λ ∈ Λ, an algebraic number whose first embedding
is zero. A nonzero algebraic number cannot have one conjugate equal to zero. Thus λ = 0.
    For each counted pair x, x + u, the planar distance is
                                                     |σ1 (u)| = 1.
So these become unit distances. Could two different u’s produce the same planar ordered pair? The difference
in the coset is unique, and the projection is injective; also if two algebraic u’s have the same first coordinate,
then their difference has first embedding zero and hence is zero. So no multiplicity problem beyond the two
orientations of an unordered pair.
    Packing bound: if λ ∈ q −2 OK is nonzero, then β = q 2 λ is a nonzero algebraic integer. Hence
                                                    |NK/Q (β)| ≥ 1.
Using one embedding from each conjugate pair,
                                       Y
                                       d
                                             |σr (λ)|2 = q −4d |N (β)| ≥ q −4d ,
                                       r=1


                                                           84
so
                                               Y
                                               d
                                                     |σr (λ)| ≥ q −2d .
                                               r=1
                                      −2
Therefore if all coordinates were < q in modulus, the product would be too small. Thus distinct lattice
points are separated in the sup norm by at least q −2 . In a product of radius-R disks, this gives

                                                |X| ≤ (CRq 2 )2d .

So n is at most exponential in d, with a constant depending on q, R.
    The class number bound needs care. The argument requires h(Kj ) ≤ H d for a constant H depending on
the base construction but not on j. Bounded root discriminant should imply this, and an elementary proof
is available. Minkowski gives an integral ideal in each ideal class with norm
                                                              √
                                           ≤ C n |DL |1/2 = (C A)n
                                                                √
for a degree-n field with root discriminant ≤ A. Let X = (C A)n = eO(n) . The number of ideals of norm
m is at most dn (m), the n-fold divisor function: for each rational prime, distribute its exponent among at
most n prime ideals above it. This leaves the bound
                                              X
                                                   dn (m) ≤ eO(n)
                                               m≤X


when X = eO(n) . At first the variable n in dn is worrisome, but the usual ordered-tuple interpretation gives
the right size. The number of ordered n-tuples of positive integers with product at most X is bounded by
something like
                                                 (1 + log X)n−1
                                              X
                                                     (n − 1)!
up to harmless exponential factors. If log X = cn, then
                                     
                                (cn)n
                        log X            = cn + n log(cn) − n log n + O(n) = O(n).
                                  n!

So class number is exponential in degree.
   Thus the direction count is
                                             2td
                                     |U | ≥      = exp((t log 2 − log H)d).
                                             Hd
The hinge is that t is quadratic in `, while log H is only about O(` log `), because the base/root-discriminant
was built from ` small-ish ramified primes. For ` large, the exponent

                                               γ = t log 2 − log H

is positive.
    Then averaging gives a coset with directed pair count

                                                 D ≥ eγd/2 |X|

after choosing R large. This also forces |X| itself to grow: since D ≤ |X|2 , one gets |X| ≥ eγd/2 . Combined
with the packing upper bound |X| ≤ eBd , this yields
                                              1    1         1
                                   ν(P ) ≥      D ≥ n eγd/2 ≥ n1+γ/(2B) .
                                              2    2         2
The exponent δ = γ/(2B) may be minuscule because B contains log q, but it is fixed for the tower. Along
the layers d → ∞, n → ∞, so eventually nδ beats any nC/ log log n correction.
   There are still several places where the construction could collapse.


                                                          85
    All conjugates of u have modulus 1, but that does not force u to be a root of unity. Kronecker gives that
conclusion for algebraic integers. These u’s are not necessarily integral; they are S-units with denominator
dividing q 2 . Indeed in Q(i),
                                                       2+i
                                                       2−i
has both conjugates on the unit circle and is not a root of unity; its minimal polynomial is not monic integral.
So there is no contradiction here.
    Different algebraic directions also cannot have the same complex first coordinate. If σ1 (u − v) = 0, then
u − v = 0, because σ1 is a field embedding. The first coordinate distinguishes algebraic directions.
    The same argument rules out coincident planar points. Projection is injective on an aﬀine lattice coset.
It is not a discrete projection globally; it can be dense. But on the finite window and fixed coset, equality of
first coordinates forces equality of lattice differences.
    The averaging over translates is also consistent. The torus is V /Λ. For a measurable set A,
                                       Z
                                                                    vol A
                                              #((y + Λ) ∩ A) dy =          .
                                         V /Λ                      covol Λ

For pairs with fixed difference u ∈ Λ, the count is

                                     #{x ∈ y + Λ : x ∈ W, x + u ∈ W },

whose average is vol(W ∩ (W − u))/ covol Λ. And from

                                                 ED ≥ R0 EN

there is some y with Dy ≥ R0 Ny , unless all denominators are zero; the expected N is positive.
    Known geometric constraints do not immediately contradict this. Unit distance graphs have O(n4/3 )
edges, but here the fixed δ can be much smaller than 1/3. Bounded diameter in the first coordinate is not
by itself a linear upper bound, since the points can be arbitrarily close. Exact unit distances are rigid, but
the standard crossing-lemma bound still allows this range.
    The arithmetic tower needs precise infinite-place conventions.
    Here is the convention issue. If the marked primes split in the narrow Hilbert class field, then their prime
ideals have trivial narrow class, and their Frobenius in the maximal unramified pro-2 extension lands in the
Frattini subgroup. But the tower I want is unramified at finite primes and keeps the real places split, so
every finite layer stays totally real. For p = 2, those infinite places matter.
    In the maximal pro-2 extension unramified at finite primes and with real places split, the abelianization
is controlled by the ordinary 2-class group, not automatically by the narrow one. The ordinary Hilbert class
field is the maximal abelian extension unramified at finite primes and unramified at real places, meaning the
real places split rather than become complex. The narrow class group corresponds to a modulus including
the real places; its class field is unramified at finite primes but may ramify at infinity. For a real quadratic
field with no unit of norm −1, the narrow class number is twice the ordinary one. This is exactly the
distinction that matters.
    So the generator rank of the totally real tower should be read from the ordinary 2-class group rather than
the narrow class group. For a real quadratic discriminant with ` prime factors, genus theory gives narrow
2-rank ` − 1; the ordinary rank can be ` − 1 or ` − 2, depending on the norm-−1 unit issue. Losing one
generator would not affect the asymptotic argument, but the two ranks Q     should remain distinct.
    There is also a direct ordinary lower bound in the special choice D = ri , with ri ≡ 1 mod 8. The genus
field
                                                     √          √
                                                 Q( r1 , . . . , r` )
                                √
is totally real. Over F = Q( D) it has degree 2`−1 . Its discriminant can be checked explicitly. The multi-
quadratic field has discriminant equal to the product of discriminants of all nontrivial quadratic characters.
With ri ≡ 1 mod 4, each subfield discriminant is a product of some ri ’s, and each ri appears 2`−1 times.
Thus                                                 Y ℓ−1            ℓ−1
                                             DM =        ri2    = D2 .
                                                   i


                                                       86
Since F has discriminant D and [M : F ] = 2`−1 ,
                                                  [M :F ]           ℓ−1
                                                DF          = D2          .
The relative discriminant has norm 1. Hence M/F is unramified at finite primes and totally real, which
supplies the ordinary totally real 2-rank lower bound directly.
    So narrow classes are the wrong bookkeeping here; I need the ordinary totally real tower. Shafarevich’s
relation-rank bound for that ordinary totally real unramified 2-tower still has the shape
                                                  r ≤ d + O(1)
for the fixed real quadratic base. Even if the p = 2 infinite-place convention contributes a constant term,
that term is harmless.
    For marked primes, narrow principality is unnecessary. What is needed is trivial Frobenius in the abelian-
ization of the totally real pro-2 tower, hence membership in [G, G] ⊂ Φ(G). Ordinary principality is enough
for that. Splitting in the ordinary Hilbert 2-class field is enough, and splitting in a larger narrow field would
merely be overkill provided the ordinary field is contained in it.
    The corresponding group-theoretic step is stable. Suppose G = Fd /R is a minimal pro-2 presentation.
If gv ∈ Φ(G), then any lift of gv to the free pro-2 group lies in Φ(Fd ), because the minimal presentation
induces an isomorphism on Frattini quotients. Quotienting by the closed normal subgroup generated by k
such lifts gives a presentation with the same d and relation rank at most r + k. If the quotient were finite,
Golod-Shafarevich would require
                                                 r + k > d2 /4.
Thus for k around d2 /50 the quotient is still infinite.
    Frattini Frobenius is enough for the marked-tower lemma; principal primes are only one way to ensure
it.
    The class-number input is
                                                 h(Kj ) ≤ H fj
with H fixed once the tower is fixed. Here fj = [Fj : Q], Kj = Fj (i), and [Kj : Q] = 2fj . The root
discriminant of Fj is that of F , because the tower is unramified at finite primes and totally real; adjoining i
multiplies the root discriminant by at most a fixed constant. So rd(Kj ) ≤ A, fixed.
    Minkowski gives each ideal class in a degree n field L an integral ideal representative of norm at most
something like                                           √
                                                 X = (C A)n
when rd(L) ≤ A. The number of ideals of norm m is at most the number of ordered factorizations of m into
n positive integers, call it τn (m), because the Euler product coeﬀicients of ζL are dominated coeﬀicientwise
by those of ζ(s)n . Then                           X
                                                        τn (m)
                                                   m≤X

for X = ecn is only exp(CA n). The useful form includes the factorial:
                                      X                          (1 + log X)n−1
                                            τn (m) ≤ C n X                      .
                                                                     (n − 1)!
                                      m≤X

With X = ecn , Stirling cancels the nn , leaving exp(C(c)n). So h(Kj ) ≤ H fj .
   For the CM sign construction, suppose t rational primes pb split completely in Fj . Then Fj has fj primes
above each pb . Since pb ≡ 1 (mod 4), each of those splits in Kj = Fj (i), giving m = tfj conjugate pairs
(Ps , cPs ). For every sign vector  ∈ {0, 1}m , define
                                                     Y     Y
                                             A =       Ps   cPs .
                                                   s =1         s =0

There are 2m such ideals. By pigeonhole in Cl(Kj ), one class fiber has size at least 2m /h(Kj ). Fix η in that
fiber. For every  in it choose α with
                                              (α ) = A A−1
                                                          η .


                                                            87
Then set
                                                 u = α /c(α ).
For every chosen embedding of Kj into C, because c is complex conjugation over the totally real subfield,

                                                   |σ(u )| = 1.

At finite primes, the valuation at Ps is

                                             vPs (u ) = 2(s − ηs ).
                                                                   Q
Thus the u are distinct as  varies, and q 2 u ∈ OKj , where q = b pb . They are not roots of unity in
general; they are S-units with fixed denominator. This avoids the Kronecker trap: all archimedean absolute
values are 1, but integrality is missing.
   The number of directions is at least
                                                   2tfj
                                            |Uj | ≥ fj = eγfj ,
                                                   H
where γ = t log 2 − log H. The base rank is chosen large enough that t  `2 dominates log H = O(` log `).
Then γ > 0.
   Embed Kj into
                                                V j = C fj
by choosing one embedding from each conjugate pair. Let

                                                 Λj = q −2 OKj

under this embedding. Every u ∈ Uj lies in Λj , and every coordinate of u has modulus 1.
   Take W to be a product of disks of radius R in C. For a translate y + Λj , let

                                              Xy = (y + Λj ) ∩ W.

Averaging over y ∈ Vj /Λj ,
                                                          vol(W )
                                              E|Xy | =              .
                                                         covol(Λj )
For a fixed u,
                                                                  vol(W ∩ (W − u))
                                 E|{x ∈ Xy : x + u ∈ Xy }| =                       .
                                                                      covol(Λj )
                                                              f
Since each coordinate of u has modulus 1, the overlap is aRj , where aR is the area of intersection of two radius-
                                                          f
R disks whose centers are distance 1. Also vol(W ) = bRj , bR = πR2 . Hence the ratio of the expectations
is                                                      fj
                                                       aR
                                                |Uj |          .
                                                       bR
So there is a translate y with
                                                              f
                                               Dy ≥ |Uj |cRj |Xy |,
where cR = aR /bR . Choose R large enough that log cR > −γ/2. Then for that translate,

                                                Dy ≥ eγfj /2 |Xy |.

    The case  = η gives u = 1, not u = 0. That is a legitimate unit direction, a horizontal unit in the first
coordinate. There are no loops from a zero direction. Also if x + u = x, then u = 0, impossible.
    Project to the first complex coordinate. Projection is injective on the aﬀine coset y + Λj : if two points
differ by λ ∈ Λj and have first coordinate difference zero, then an embedding of the algebraic number λ is
zero, hence λ = 0. This remains true even if the translate y is not algebraic; differences lie in the lattice.
Therefore Py = π(Xy ) ⊂ C has n = |Xy | distinct points.


                                                         88
    For each counted pair x, x + u, the projected distance is |σ1 (u)| = 1. A fixed ordered pair determines
u = x′ − x in the lattice, so summing over u does not overcount directed pairs. Passing to unordered pairs
loses at most a factor 2.
    There is also a uniform upper bound on n in terms of fj . If x 6= x′ , let λ = x − x′ ∈ q −2 OKj . Then
β = q 2 λ is a nonzero algebraic integer, so |NKj /Q β| ≥ 1. In the chosen half of the embeddings,

                                      Y
                                      fj
                                            |σr (λ)|2 = q −4fj |N (β)| ≥ q −4fj ,
                                      r=1

so
                                                 Y
                                                 fj
                                                       |σr (λ)| ≥ q −2fj .
                                                 r=1

Thus at least one coordinate has absolute value ≥ q −2 . The points of Xy are separated in sup norm by q −2 .
Packing into the product of radius-R disks gives

                                            |Xy | ≤ (1 + 2Rq 2 )2fj = eBfj

for a fixed B.
    Also n = |Xy | tends to infinity for the good translate. Indeed Dy ≤ n2 , while Dy ≥ eγfj /2 n; if Dy > 0,
this gives n ≥ eγfj /2 . And averaging gives some translate with Dy > 0, since the intersection volumes are
positive.
    Thus
                                                   1       1
                                           ν(Py ) ≥ Dy ≥ neγfj /2 .
                                                   2       2
Since n ≤ eBfj ,
                                                  eγfj /2 ≥ nγ/(2B) .
So
                                                        1 1+γ/(2B)
                                                ν(Py ) ≥  n         .
                                                        2
For large j, absorb the factor 1/2 and call the exponent increment δ > 0.
    This gives an infinite sequence nj with ν(nj ) ≥ n1+δj   . Since log log nj → ∞, any bound n1+C/ log log n is
                             1+δ
eventually smaller than n . So it disproves the asserted all-large-n upper bound.
    Several possible obstructions still do not break the mechanism. A planar set with many translations by
many unit complex numbers need not have size at least the square of the number of directions. The model
set is a cut-and-project set; the first coordinate alone can be very dense while the other coordinates control
membership. The standard unit-distance graph upper bounds allow n1+δ if δ < 1/3, and this δ may be tiny.
    The class-group pigeonhole is also compatible  Q with the tower. The analytic class number formula feels
the split Euler factors, but the contribution is b (1 − 1/pb )−O(fj ) , just another exponential constant. If the
pb are large, it is negligible. Even if there are 2m sign ideals, the class group may have far fewer classes; the
surplus produces exactly the principal quotients and S-units needed here.
    Sharper height bounds do not rule out the u’s. Their archimedean height is 1, but their finite height is
                                                                                                               2
controlled by q. Northcott gives finiteness for each degree, but the count can be exponential or even H O(d ) .
Only exp(cfj ) is needed.
    Marked primes can be specified without principal ideals. The actual requirement is Frobenius in Φ(G).
Let G be the maximal totally real unramified pro-2 group over F . Its Frattini quotient G/Φ(G) is finite
elementary abelian. Let E/F be the corresponding finite field. If rational primes pb split completely in the
normal closure over Q of E(i), then pb ≡ 1 (mod 4), pb splits in F , and every prime of F above pb has
Frobenius trivial in G/Φ(G). This is exactly the Frattini condition and avoids ordinary/narrow Hilbert class
field terminology at the marking stage.                                                   √                 Q
    The lower bound for d(G) still comes directly from genus theory. Take F = Q( D) with D =                   ri ,
ri ≡ 1 (mod 8). The multiquadratic field
                                                     √            √
                                               M = Q( r1 , . . . , r` )

                                                            89
contains F , has degree 2`−1 over F , and is totally real. Its finite unramifiedness follows from the same
discriminant computation:
                                                          ℓ−1
                                              |DM | = D2 .
Since DF = D and [M : F ] = 2`−1 , the relative discriminant has norm 1. Thus d(G) ≥ ` − 1.
   Shafarevich gives
                                            r(G) ≤ d(G) + C0 .
Set                                                          
                                                t = d(G)2 /100 .
Choose t rational primes splitting in the normal closure of E(i). There are two primes of F above each, so
killing all marked Frobenii adds 2t relations. For large d,

                                      r(G) + 2t ≤ d + C0 + d2 /50 < d2 /4.

Golod-Shafarevich gives an infinite quotient. Its finite subextensions Fj are totally real, unramified over F ,
and all marked pb split completely.
   Splitting in the quotient tower follows because a Frobenius conjugacy class is killed for each prime of F
above pb . The quotient is Galois over F ; if Frobenius is trivial, the prime splits completely in every finite
subextension. Since pb already splits in F/Q, it has fj = [Fj : Q] degree-one primes in Fj .
   Choose the ri not too large, say the first ` primes 1 mod 8, so

                                                log D = O(` log `)

by the prime number theorem in progressions. Then the root discriminant of F has logarithm O(` log `).
The marked primes pb may be astronomically large because E is huge, but they are unramified and split in
the tower; they do not enter the root discriminant of Fj or Kj . They do enter q, hence the packing constant
B, and may make δ absurdly small. But q is fixed once the tower is chosen.
    The sign construction does not require the marked primes to be principal in F or Fj . In Kj , the ideals
A A−1
     η become principal only after the class-group pigeonhole, and that is enough.
    The finite subfields behave as required. The infinite quotient of G is a finitely generated infinite pro-2
group, so it has open normal subgroups of arbitrarily large index. The fixed fields Fj have degrees over F
tending to infinity. They need not be Galois over Q, but that does not matter. Since the marked rational p
splits in F and each base prime splits completely in Fj /F , it splits completely as degree-one primes in Fj .
Then in Kj = Fj (i), because p ≡ 1 (mod 4), every one of those primes splits into a conjugate pair. Count
m = tfj is right: fj primes of Fj per rational p, hence fj pairs in Kj per p.
    There is no duplication in Uj . For  = η, u = 1. If some other  6= η also gave u = 1, the valuation
formula would force all s − ηs = 0, impossible. More generally, distinct valuation vectors at the selected Ps
give distinct u. If two ’s in the same class fiber differ but their quotient ideal is principal in a way involving
a unit, the unit can alter α, but it cannot alter the finite valuations of u = α/cα. The valuation test still
separates them.
    This uses the fact that all relevant valuation differences would have to vanish before two sign choices
could coincide. There is a separate ambiguity because α is chosen only up to a unit. If α is replaced by
wα, then
                                                     u = α/cα
gets multiplied by w/cw. This has zero valuation at every finite prime and modulus 1 at every archimedean
embedding. Since w/cw is an algebraic integer, Kronecker makes it a root of unity. So for a fixed  the actual
complex direction is not canonical. In these CM fields the roots of unity may be only {±1, ±i}, although
Fj could in principle contain some cos(2π/m). The group is finite anyway, and the lower bound does not
use uniqueness of a canonical representative. More importantly, if  6= ′ , the finite valuation vector of u
is different. Multiplying by one of these unit quotients cannot change that. So no collision occurs between
different sign patterns in the fiber.
    The class-group step uses ordinary ideal classes of Kj . If A and Aη are in the same class, there is some
nonzero α ∈ Kj with
                                                (α) = A A−1η .


                                                        90
There is no need for α to be integral. The divisor equality alone gives theQprescribed valuations for u = α/cα.
   The denominator check is uniform. At the selected primes over q = pb , the valuation of u is 0, ±2. At
primes not over q, it is 0. Every prime over each pb in Kj is included, paired as (P, cP). Thus multiplying
by q 2 clears every possible negative valuation. There is no hidden prime above q outside the list, because
the pb ’s split completely in Fj and then split in Kj /Fj .
   Root discriminants remain controlled. Fj /F is unramified, so rd(Fj ) = rd(F ). Passing to Kj = Fj (i),
the relative discriminant of x2 + 1 divides 4OFj , even if the primes above 2 have large residue degree in the
tower. Hence
                                               rd(Kj ) ≤ 2 rd(F ).
                                                           f
Then the class-number bound is of the form h(Kj ) ≤ H` j , after absorbing the fact that [Kj : Q] = 2fj . One
can write H` = C(A` )2 , or simply absorb it into the fixed base constant.
    If pb splits completely in every Fj , and pb ≡ 1 (mod 4), then every prime above it splits in Fj (i). This
supplies exactly the conjugate pairs used above.
    The lattice Λj = q −2 OKj in
                                                   V j = C fj
                                                                                        p
is a full real-rank 2fj lattice under the CM Minkowski embedding. Its covolume is 2−fj |DKj | q −4fj , up to
the usual normalization. The window count may be astronomically large, but that is not a planar packing
obstruction after projection: the projected points can be arbitrarily close.
    The exponent can be compared with known upper bounds. The construction gives some fixed
                                                 δ = γ/(4B)
or similar. If unexpectedly small split primes made δ > 1/3, that would run into the classical O(n4/3 ) upper
bound, so something would have to give. But no large δ is needed, and the Chebotarev primes may be chosen
as large as desired. Then q, hence B, becomes huge and δ becomes tiny. A tiny fixed positive exponent is
enough for the asymptotic negation.
    The likely amplification point is still legal. The best familiar lower-bound mechanism in the plane is the
lattice/rational-circle mechanism, giving the Erdos n1+c/ log log n type lower bound. Here it is amplified by
an unramified tower and a cut-and-project map. Arbitrary real point sets have more freedom than rational
lattice sets, so high-degree algebraic coordinates are not excluded. A direction u with all conjugates on the
unit circle but nonintegral is a valid planar unit complex number under one embedding. Kronecker does not
kill it because of the denominator.
    No elementary graph obstruction appears. Unit distance graphs in the plane are K2,3 -free: two points
have at most two common unit neighbors. The Cayley-type count respects that. If two different algebraic
directions had the same first-coordinate direction, injectivity of the embedding would force them equal. An
average degree nδ with δ < 1/3 is compatible with the incidence upper bounds.
    Marked primes split in the Frattini quotient field. For an unramified prime, the decomposition group
in the full pro-2 tower is topologically generated by a Frobenius element, possibly a Z2 -like closure. Killing
that Frobenius element in the quotient kills the whole decomposition group, hence forces complete splitting
in the quotient tower. One relation per prime of F above pb is the right accounting. Since those Frobenii
are in Φ(G), adding the relators does not reduce the minimal number of generators. Golod-Shafarevich then
applies to the resulting presentation. The Frattini-field selection avoids a principal-prime story.
    Tsfasman-Vladut-type constraints do not forbid a tower with these split rational primes. The analytic
                                                            √
constraints weight split primes by quantities like log p/( p − 1), not by their raw number. Chebotarev lets
the marked primes be extremely large. That makes q enormous and weakens δ, but the primes remain fixed
as j → ∞. So it does not force δ to vanish.
    The base case K = Q(i) illustrates the mechanism. Choose t rational primes p ≡ 1 (mod 4). For each
sign choice one gets a Gaussian rational of norm 1, denominator dividing q or q 2 . The lattice q −2 Z[i] in
a disk has roughly q 4 points, and 2t directions. Optimizing over the first t primes gives the classical extra
exponent log 2/(4 log t). In a fixed field, the denominator grows with the number of directions. In the tower,
the same finite list of rational primes splits into fj copies upstairs; there are 2tfj sign choices while the
rational denominator q stays fixed. The class-number entropy is only H fj . That is the amplification.
    This behaves like taking tensor powers of the Gaussian construction in high dimension. In Cf , product
directions can have every coordinate on the unit circle. A generic projection to C would not preserve their


                                                      91
lengths, and projection to the first coordinate would collapse a product lattice. The number-field lattice is
special: the first coordinate map is injective on the lattice because the coordinates are conjugates of one
algebraic number, while the selected S-unit directions still have many independent valuation choices. This is
the delicate cut-and-project feature. The inverse projection is horribly non-Lipschitz; projected points may
be unimaginably close. But the problem allows that.
    A crude difference count is compatible with the number of directions. If u, v are in the direction set, then
u − v ∈ q −2 OK , and every conjugate has modulus at most 2. The number of possible differences is roughly
(Cq 2 )2f , exponential in f . The lower bound for |U | is also exponential, with a rate that can be made smaller
by taking q large.                                 Q                        √
   Take primes ri ≡ 1 (mod 8), set D =                ri , and let F = Q( D). The multiquadratic field M =
   √           √
Q( r1 , . . . , r` ) is totally real and contains F . Its degree over F is 2`−1 . Since the ri ’s are coprime positive
fundamental discriminants, the discriminant of M is the product of the discriminants of all its nontrivial
quadratic subfields; each ri appears in 2`−1 of them. Thus
                                                              ℓ−1       [M :F ]
                                              DM = D 2              = DF          ,
so M/F is unramified at finite primes. It is totally real, so it is unramified/split at infinity in the sense needed
for the totally real Hilbert tower. Hence the generator rank d(G) of the maximal totally real unramified
pro-2 group is at least ` − 1.
    For a real quadratic F , Shafarevich gives a presentation with relation rank at most d(G) + c0 , where c0
is absolute; it is essentially the unit-rank contribution. Then if t = bd2 /100c, after killing the two Frobenius
elements above each of t rational primes there is still
                                                      r + 2t < d2 /4
for large d. The Golod-Shafarevich inequality rules out finiteness.
    Let E/F be the finite elementary abelian extension corresponding to G/Φ(G). Choose rational primes
splitting completely in the normal closure over Q of E(i). Then they are unramified, they satisfy pb ≡ 1
(mod 4), they split in F , and each prime of F above pb has Frobenius trivial in G/Φ(G). Chebotarev also
allows these pb ’s to be huge. After quotienting by their Frobenii, the resulting infinite tower Fj is totally
real, unramified over F , and all the pb ’s split completely in every layer.
    The class-number estimate must beat the direction entropy. Since ri are the first or at least reasonably
small primes 1 mod 8, one can arrange
                                                            1
                                         log rd(F ) =         log D = O(` log `).
                                                            2
Then rd(Kj ) ≤ A` with log A` = O(` log `). For any degree
                                                         √ n field of root discriminant ≤ A, Minkowski
gives a representative ideal in each class of norm X = (C A)n . The number of ideals of norm m is at most
the n-fold divisor function dn (m). Summing up to X = ecn gives something like
                                        X                           (1 + log X)n−1
                                             dn (m) ≤ C n X                        ,
                                                                        (n − 1)!
                                       m≤X

                                n
and Stirling makes this C(A) , with log C(A) = O(log A + log log A). Therefore
                                                  f
                                      h(Kj ) ≤ H` j ,          log H` = O(` log `).
Meanwhile t  d2 ≥ c`2 , so for large `
                                             γ = t log 2 − log H` > 0.
Even if d is larger than `, that only helps t. The size of E, and hence the size of the Chebotarev primes,
may explode; that only enters later through q, not through γ.
    The u construction is controlled by valuations. In Kj , for each marked rational prime and each prime
of Fj above it, there are two conjugate primes Ps , cPs . The number of pairs is m = tfj . For  ∈ {0, 1}m ,
                                                Y
                                           A =     Pss (cPs )1−s .
                                                        s


                                                              92
One ideal class contains at least 2m /h(Kj ) of these ideals. Fix η in that class and, for every  in the same
fiber, choose α with
                                                (α ) = A A−1
                                                            η .

Then
                                                    u = α /cα .
For every selected Ps ,
                                               vPs (u ) = 2(s − ηs ),
and at cPs it is the negative. All other valuations vanish. Hence q 2 u ∈ OKj . Also every complex embedding
σ satisfies σ(cα) = σ(α), because Fj is totally real and c is the CM involution; so |σ(u )| = 1. Distinct ’s
have distinct valuation vectors. Thus
                                                           f
                                            |Uj | ≥ 2tfj /H` j = eγfj .
   Choose R large enough that if BR ⊂ C is the disk of radius R, then

                                                   area(BR ∩ (BR − z))
                                          cR =
                                                        area(BR )
                                                                          f
for |z| = 1 satisfies log cR > −γ/2. In Vj = Cfj , take W = BRj . For a random translate y + Λj , with
Λj = q −2 OKj , let Xy = (y + Λj ) ∩ W . Averaging over a fundamental domain,
                                                               f
                                               EDy = |Uj |cRj E|Xy |.

So some translate satisfies
                                                      f
                                        Dy ≥ |Uj |cRj |Xy | ≥ eγfj /2 |Xy |.
Since a directed counted edge is determined by its ordered endpoints, Dy ≤ |Xy |2 . Thus |Xy | ≥ eγfj /2 , so
the point counts go to infinity.
   For packing, if x 6= x′ in a coset, λ = x − x′ ∈ q −2 OKj . Then β = q 2 λ is a nonzero algebraic integer, so

                                         Y
                                         fj
                                               |σr (λ)|2 = |N (λ)| ≥ q −4fj .
                                         r=1
             Q
Equivalently r |σr (λ)| ≥ q −2fj . Thus some coordinate differs by at least q −2 . Points in W are q −2 -separated
in the sup norm, so
                                         |Xy | ≤ (1 + 2Rq 2 )2fj = eBfj
for a fixed B. The pb ’s may deliberately be chosen so large that B dwarfs γ; that keeps the eventual δ small
and avoids any apparent tension with coarse incidence upper bounds.
    Projection is still the crucial last step. Let π be the first complex coordinate. If π(x) = π(x′ ) for two
points in the same aﬀine lattice coset, then λ = x − x′ ∈ q −2 OK has first embedding 0. Since that embedding
is an injective field homomorphism, λ = 0. So the projection is injective on Xy . And if x + u ∈ Xy , then

                                        |π(x + u) − π(x)| = |σ1 (u)| = 1.

Distinct directed pairs remain distinct after projection; an unordered segment is counted at most twice.
Hence with nj = |Xy |,
                                                 1       1
                                        ν(Pj ) ≥ Dy ≥ nj eγfj /2 .
                                                 2       2
Using nj ≤ eBfj , this becomes, for large j,

                                                    ν(Pj ) ≥ n1+δ
                                                              j

with some fixed positive δ.
    The asymptotic negation is then direct: q, R, B, γ, δ are fixed once the tower and marked primes are
fixed, while fj → ∞ and hence nj → ∞. For any prescribed constant C, eventually δ > C/ log log nj .


                                                          93
    One more geometric concern is bounded diameter: all projected points lie in the first-coordinate disk
of radius R, a fixed bounded region. That does not itself forbid n1+δ exact unit distances. Unit neighbors
of each point lie on a unit circle centered at that point, so the count is an incidence problem between n
points and n unit circles in a bounded enlargement of the disk. The usual pseudocircle and polynomial-
partitioning bounds still give the familiar superlinear allowable range; they do not force near-linearity merely
from bounded diameter.
    Compactness also gives no separation. If the points cluster, edges still solve the exact equation |x−y| = 1.
A separated set in a compact region would have bounded size, but this construction is deliberately not
separated after projection. The projected points can be exponentially close.
    Nor does the standard crossing-lemma proof improve simply because the drawing lies in a bounded disk.
Edges can cross and overlap massively. The geometry remains consistent.
    The ordinary totally real convention is required. For
                                                     √          √
                                             M = Q( r1 , . . . , r` ),

the discriminant calculation is
                                              Y        Y                 ℓ−1
                               |DM | =                        ri = D 2         = |DF |[M :F ] .
                                         ∅̸=S⊂{1,...,`} i∈S

Since M is totally real, this is unramified also at the infinite places. Therefore M/F lies inside the totally
real unramified 2-extension, and d(G) ≥ ` − 1.
    The marked-prime step can be formulated through the Frattini subgroup. Let G be the maximal totally
real unramified pro-2 Galois group over F , and let E be the fixed field of Φ(G). If a rational prime p splits
completely in the normal closure of E(i), then p ≡ 1 (mod 4), it splits in F , and for each prime v | p in
F the Frobenius in G maps trivially to G/Φ(G). So the Frobenius element lies in Φ(G). No principality
assumption in F is needed.
    Killing the Frobenius elements for the two primes of F above each marked rational prime pb preserves
generator rank and adds at most 2t relations. If r(G) ≤ d(G) + c0 , and

                                                 t = bd(G)2 /100c,

then for large d
                                              r(G) + 2t < d(G)2 /4.
Golod-Shafarevich makes the quotient infinite. In an unramified pro-extension, the decomposition group at
v is topologically generated by Frobenius; killing that element makes the decomposition group trivial. Thus
each marked pb splits completely in every finite layer of the quotient tower.
    Chebotarev is applied to rational primes split in the normal closure of E(i), not just in E over F , so the
condition is uniform. Here F is quadratic and normal anyway, but later Fj /Q need not be normal. Complete
splitting in the tower over F , plus p split in F , still gives residue degree one over Q for all primes upstairs.
    Since Fj is totally real, Kj = Fj (i) is CM. The marked pb ’s split completely in Fj , and since pb ≡ 1
(mod 4), each degree-one prime of Fj splits into a conjugate pair in Kj . For t rational primes and fj = [Fj :
Q], there are
                                                      m = tfj
pairs {Ps , cPs }.
    The class-number bound is independent of the marked primes. The root discriminant of Fj is the same
as that of F , because the tower is unramified at finite primes and totally real. For Kj /Fj , the relative
discriminant divides 4OFj , even if 2 is ramified in Fj , because x2 + 1 has discriminant −4. Thus

                                                rd(Kj ) ≤ 2 rd(F ).
                                         f
Write A` = 2 rd(F ). Then h(Kj ) ≤ H` j for some H` with log H` = O(` log `).
   The class-number estimate really is exponential, not en log n . For a degree n field L with root discriminant
at most A, Minkowski gives an integral ideal in each class with norm
                                                       √
                                               X ≤ (C A)n

                                                          94
absorbing the factorial/Stirling factor into C n . The number of ideals of norm m is at most the ordered n-fold
divisor function dn (m), because over each rational prime there are at most n prime-ideal slots. Then
                                                    X
                                                        dn (m)
                                                    m≤X

is bounded by something like
                                                    (1 + log X)n−1
                                             C nX                  .
                                                        (n − 1)!
If X = ecn , Stirling gives an exponential in n, with base depending on c, not a superexponential. So
h(L) ≤ C(A)n . For L = Kj , n = 2fj , and the factor 2 is absorbed into H` .
   For each  ∈ {0, 1}m , define                 Y       Y
                                          A =       Ps      cPs .
                                                    s =1        s =0

Pigeonhole in Cl(Kj ). One class contains a fiber E of size at least

                                     2m /h(Kj ) ≥ exp((t log 2 − log H` )fj ).

Fix η ∈ E. For  ∈ E, choose α with
                                                 (α ) = A A−1
                                                             η ,

and put
                                                 u = α /c(α ).
No canonical choice of α is needed. If it is multiplied by a unit, u changes by a norm-one unit, but the
valuation pattern at the selected primes is fixed, and that is enough for distinctness.
   Indeed,
                                            vPs (u ) = 2(s − ηs ),
so different ’s give different
                       Q        u . Also the negative exponents are at worst −2, all over the marked rational
primes, hence if q = b pb ,
                                                   q 2 u ∈ O K j .
At every chosen complex embedding σ,
                                                  σ(cα) = σ(α)
because Fj is totally real and c is complex conjugation over it. Hence

                                                    |σ(u )| = 1.

These are controlled-denominator S-units on the compact archimedean torus. Kronecker is not a problem
because they are not algebraic integers in general.
    The entropy inequality stays explicit. Since d(G) ≥ ` − 1, t  `2 . Since log H` = O(` log `), for suﬀiciently
large `
                                           γ := t log 2 − log H` > 0.
After fixing such an ` and fixing the marked primes pb , q may be enormous, but it is fixed while j → ∞. It
only makes the eventual exponent smaller.
   Embed Kj into
                                                 V j = C fj
using one embedding from each conjugate pair, and let

                                                 Λj = q −2 OKj .

Every u ∈ Uj := {u } lies in Λj and has each coordinate of modulus 1.
   Choose W to be the product of fj disks of radius R. For a translate y + Λj , set

                                              Xy = (y + Λj ) ∩ W.


                                                            95
Averaging over the torus Vj /Λj gives
                                                            vol(W )
                                             E|Xy | =                 .
                                                           covol(Λj )
For fixed u, the expected number of x ∈ y + Λj with x, x + u ∈ W is

                                              vol(W ∩ (W − u))
                                                               .
                                                  covol(Λj )

Since every coordinate of u has length 1, the overlap is the fj -th power of the area overlap of two radius-R
disks whose centers are distance 1. If cR is the one-coordinate overlap ratio, then
                                               EDy            f
                                                      = |Uj |cRj .
                                               E|Xy |

Choosing R large enough that log cR > −γ/2, there is a translate with

                                               Dy ≥ eγfj /2 |Xy |.

This averaging over an arbitrary coset is legal. The points of Xy need not be conjugates of one algebraic
number plus an algebraic offset; only their differences are lattice vectors. The planar point set is just the
first coordinate.
    Also Dy ≤ |Xy |2 . A directed pair (x, x′ ) determines u = x′ − x; distinct u’s cannot give the same ordered
pair. Since u 6= 0, there are no loops. Therefore the above inequality forces

                                                |Xy | ≥ eγfj /2 ,

so the point counts go to infinity along the tower.
    If x 6= x′ in the same coset, then λ = x − x′ ∈ q −2 OKj . Let β = q 2 λ, a nonzero algebraic integer. Thus

                                               |NKj /Q (β)| ≥ 1.

Using one embedding from each complex-conjugate pair,

                                                    Y
                                                    fj
                                        |N (λ)| =         |σr (λ)|2 ≥ q −4fj ,
                                                    r=1

so
                                              Y
                                              fj
                                                   |σr (λ)| ≥ q −2fj .
                                             r=1

Therefore at least one coordinate has modulus ≥ q −2 . So Xy is q −2 -separated in the product sup norm.
Packing in the product of radius-R disks gives

                                         |Xy | ≤ (1 + 2Rq 2 )2fj = eBfj

for fixed B.
    Projection to the first coordinate is the last possible collapse. Let π : Vj → C. If x, x′ ∈ y + Λj and
π(x) = π(x′ ), then x−x′ ∈ Λj corresponds to an algebraic number whose first embedding is 0. An embedding
is injective, so that algebraic number is 0, hence x = x′ . Thus Pj = π(Xy ) has nj = |Xy | distinct planar
points.
    If x + u ∈ Xy , then
                                       |π(x + u) − π(x)| = |σ1 (u)| = 1.
A fixed unordered planar segment is counted at most twice in Dy : projection is injective on the coset, and
an ordered pair determines its full difference vector; the only second count is the reverse orientation, if −u
also belongs to Uj . Hence
                                                ν(Pj ) ≥ Dy /2.


                                                          96
Combining with the packing upper bound,
                                                 1             1 1+γ/(2B)
                                      ν(Pj ) ≥     nj eγfj /2 ≥ nj        .
                                                 2             2
After j is large enough, the factor 1/2 can be absorbed to give n1+δ
                                                                 j   for some fixed positive δ, say δ = γ/(4B).
    The final quantifier remains fixed-exponent rather than varying-exponent. The quotient tower is infinite,
so there are finite layers Fj with fj → ∞. For each such j, choose a good translate and obtain nj . The
lower bound nj ≥ eγfj /2 implies nj → ∞. The exponent δ is fixed once `, the marked primes, q, and R are
fixed. Therefore for any prescribed C, once nj is so large that C/ log log nj < δ,
                                                             1+C/ log log nj
                                       ν(nj ) ≥ ν(Pj ) > nj                    .

So this gives the negative alternative, not just infinitely many examples with a varying exponent.
    Shafarevich’s relation-rank theorem is used in the ordinary totally real unramified setting. For a real
quadratic base, the defect is bounded by an absolute constant; more explicitly one can bound it by the
dimension of units modulo squares, up to the standard convention.
    For the genus field, each ri ≡ 1 (mod 8), so every nonempty product has fundamental discriminant equal
to that product. Each ri occurs in 2`−1 of the quadratic subfield discriminants. Thus the discriminant
formula is exact, and the relative discriminant of M/F has norm 1. This gives d(G) ≥ ` − 1.
    Nothing requires Kj to be Galois over Q. The ideal counting and embeddings do not require Galois.
Splitting of the marked rational primes is guaranteed because the tower quotient was constructed so each
prime over pb in F splits completely over F , and pb already splits in F . Residue degree remains 1 all the
way. Then adjoining i splits again because pb ≡ 1 (mod 4).
    Bounded diameter still does not force near-linearity without separation. The standard Erdos grid con-
struction, if one chooses a lattice radius comparable to the grid side and scales that radius to 1, already
lives in a bounded-size square and gives n1+o(1) unit distances. Compactness alone definitely does not force
linearity. This construction is a high-degree, fixed-denominator-in-the-base analogue after passing up the
tower.
    The local graph obstruction is likewise consistent. For two centers in the plane, their unit circles meet
in at most two points, so common-neighbor counts are bounded. The direction set Uj respects that after
projection: for a fixed center difference w, the equations σ1 (u) and σ1 (u − w) lie on two unit circles, so
there are at most two first-coordinate possibilities, and injectivity gives at most two algebraic u’s. Thus the
resulting graph is K2,3 -free as it should be. A degree nδ with δ tiny is compatible with that.
    An arbitrary translate y is not a hidden problem. If y is nonalgebraic, the first coordinates are still
honest complex numbers. Distances between counted pairs are determined by algebraic differences u. If two
projected points coincided, their difference would be an algebraic lattice vector with zero first embedding,
impossible. So the cut-and-project averaging legitimately finds a dense finite patch; the points need not
themselves be presented as algebraic numbers.
    The only cost of choosing Chebotarev primes split in the huge Frattini field E(i) is that q may be
enormous. That appears in B ∼ log(1 + 2Rq 2 ) and shrinks δ. But once fixed, q does not grow with j.
                                                                                      √
Known tower constraints on many split primes weight them by terms like log p/( p − 1); choosing them
large is consistent with bounded root discriminant. Any positive fixed δ suﬀices.
    The order of choices matters: choose ` large enough first so that t log 2 > log H` ; then choose the t split
rational primes; then fix all constants; only then let the tower degree fj go to infinity.
    The quotient tower remains compatible with its Frattini quotient. After killing the selected Frobenius
elements, the quotient tower still has the same maximal elementary abelian quotient in the relevant sense:
killing a closed normal subgroup generated inside Φ(G) does not change G/Φ(G). Splitting itself comes from
killing Frobenius.
    Killing these Frobenii has nothing to do with i. The tower is over the totally real field F ; i is only
adjoined later. Thus the quotient operation cannot interfere with the condition p ≡ 1 (mod 4), which was
enforced by choosing rational primes to split in the normal closure of E(i).
    The class-number constant is independent of the marked primes. The bound A` for the root discriminant
includes the factor 2 from adjoining i, and

                                              log A` = O(` log `).


                                                        97
                                                                     f
Then the ideal-counting/Minkowski argument gives h(Kj ) ≤ H` j with

                                              log H` = O(` log `).

Although Kj = Fj (i) lies in a quotient tower that depends on the pb , the root discriminant of every Fj is still
rd(F ), because the quotient tower is still unramified at finite primes
                                                                   Q and totally real. Thus the class-number
upper bound is uniform over all such quotients. The large q = pb does not enter H` .
    Marking the pb does not collapse the infinite quotient through the real embeddings. Golod-Shafarevich
is applied directly to the presentation of the totally real unramified pro-2 group. The quotient has the same
generator rank and at most 2t extra relators, and the numerical inequality still makes it infinite.
    For
                                                 √                Ỳ
                                         F = Q( D),          D=      ra ,
                                                                 a=1

with all ra ≡ 1 (mod 8), the multiquadratic field
                                                  √            √
                                            M = Q( r1 , . . . , r` )

has degree 2` over Q, and since F is generated by the product square-root, [M : F ] = 2`−1 . For ` = 1,
M = F , degree 1. For ` = 2, M is the biquadratic genus field, and if both primes are 1 (mod 4), the relative
discriminant over F is 1. For ` = 3, the same discriminant product formula gives it. More generally,
                                                      Y
                                              |DM | =    |Dχ |
                                                            χ

over the quadratic characters of the multiquadratic extension. Each prime ra appears in exactly 2`−1 of
these discriminants, so
                                                  ℓ−1
                                      |DM | = D2      = |DF |[M :F ] .
Thus the relative discriminant has norm 1. And M is totally real, so real places split as real embeddings.
Hence M ⊂ the maximal totally real unramified pro-2 extension. Therefore

                                                 d(G) ≥ ` − 1.

   For the relation rank, Shafarevich gives, for this G,

                                               r(G) ≤ d(G) + c0

with c0 absolute here, since the base field is real quadratic. This is the usual relation-rank estimate for the
unramified 2-tower group with the real places required to split. If d is larger than ` − 1, that only helps.
    The group-theoretic inequality is needed in the following form. A finite pro-2 group with a minimal
presentation on d generators and r relators satisfies r > d2 /4. This is the crude Golod-Shafarevich conse-
quence. In a minimal pro-p presentation, relators lie in the Frattini subgroup of the free pro-p group, so
their Zassenhaus degree is at least 2. For p = 2, squares have degree 2, still fine. If G is quotiented by the
normal closures of k elements, the quotient has a presentation with the same d generators and at most r + k
relators. It may not be minimal, but minimal relation rank is no larger. Thus if r + k < d2 /4, the quotient
cannot be finite.
    If one of the chosen pb was already split in the full tower, the corresponding Frobenius is already identity
and the relation is redundant. That only helps.
    For an arbitrary aﬀine coset y + Λj , the lattice is additive:

                                          Λj = q −2 OKj ⊂ Vj = Cfj .

For every direction u ∈ Uj , one has u ∈ Λj . Thus if x ∈ y + Λj , then x + u ∈ y + Λj . No multiplicative
invariance of the lattice is needed.
   The unit segment in the plane is just the first coordinate:

                                           π(x + u) − π(x) = σ1 (u),


                                                       98
and |σ1 (u)| = 1. This is independent of the translate y.
    Distinct u’s give distinct planar directions. If σ1 (u) = σ1 (v), then σ1 (u − v) = 0. Since σ1 is a field
embedding, it is injective, so u = v. Thus the directions are distinct as complex numbers under the chosen
embedding. Of course u and −u may both occur; that only corresponds to the two orientations of the same
geometric segment. An ordered pair determines its difference u, so no large multiplicity appears.
    The ordinary/narrow Hilbert class field convention works as follows. In class field theory, modulus 1
– no finite or infinite primes in the modulus – corresponds to quotienting by all principal ideals, with no
sign condition. Locally at a real place not in the modulus, the local subgroup is R× , so the only local
extension allowed is trivial; the real place splits or stays real. If a real place is put into the modulus, the
local subgroup becomes R>0 , and the quadratic extension C/R is allowed. Thus the ordinary class group
corresponds to the maximal abelian extension unramified at finite primes and split at infinity; the narrow
class group corresponds to allowing ramification at the specified real places. For example, in a real quadratic
field with no unit of norm −1, h+ = 2h; the √ extra narrow part is a complexification at infinity, not a totally
real unramified field. This matches the Q( 3)-type memory: ordinary class number 1, narrow class number
2, and the extra extension should be ramified at infinity, not a totally real Hilbert class field.
    So define G directly as the Galois group of the maximal pro-2 extension unramified at finite primes and
totally real. In this setting d(G) is the ordinary 2-rank, but the argument only uses that M lies inside this
extension together with Shafarevich’s relation bound for the restricted group.
    The class-group pigeonhole in Kj uses the ordinary ideal class group of Kj . For each split prime pair
{Ps , cPs }, and each sign vector , set            Y      Y
                                             A =       Ps     cPs .
                                                      s =1        s =0

If two of these ideals have the same ordinary ideal class, then

                                                  A A−1
                                                      η = (α )

for some α ∈ Kj× . No ray class condition is needed. The generator may have zeros or poles at the selected
primes, and that is exactly what is useful.
    Then
                                               u = α /c(α ).
At a selected prime Ps , the valuation is

                                               vPs (u ) = 2(s − ηs )

up to the convention of which member of  Q the conjugate pair is called Ps . Thus these valuations are in
{−2, 0, 2}, and outside primes above q = pb the valuations vanish. Hence q 2 u is integral. This is exactly
why the denominator lattice is q −2 OK .
   For the separation/packing bound, if x, x′ ∈ y + Λ are distinct, then

                               λ = x − x′ ∈ q −2 OK ,              β = q 2 λ ∈ OK \ {0}.

Choosing one embedding from each complex-conjugate pair,

                                        Y
                                        f
                                              |σr (β)|2 = |NK/Q (β)| ≥ 1.
                                        r=1

Therefore
                                                Y
                                                f
                                                      |σr (λ)| ≥ q −2f .
                                                r=1

So at least one coordinate satisfies |σr (λ)| ≥ q −2 . Thus the finite set inside the product window is q −2 -
separated in sup norm. A packing estimate in Cf , coordinate by coordinate, gives

                                            |Xy | ≤ (1 + 2Rq 2 )2f = eBf


                                                              99
for some fixed B.
    The averaging step is also stable. Let W be the product of f disks of radius R. If b is the area of one
disk and a the overlap area of two such disks whose centers are distance 1 apart, then for each u ∈ U ,

                                           vol(W ∩ (W − u)) = af ,

because every coordinate of u has modulus 1. Averaging over V /Λ,

                                                 bf                       |U |af
                                    E|Xy | =           ,         EDy =           .
                                               covol Λ                   covol Λ
Therefore some y has
                                               Dy ≥ |U |(a/b)f |Xy |.
If |U | ≥ eγf , choose R so large that cR = a/b satisfies log cR > −γ/2. Then

                                                 Dy ≥ eγf /2 |Xy |.

Since each directed pair is determined by its ordered endpoints, Dy ≤ |Xy |2 , hence this good set has

                                                   |Xy | ≥ eγf /2

and in particular the point counts go to infinity.
    Projection to the first coordinate is injective on y + Λ: if two points have the same first coordinate, their
difference is an algebraic element of Λ with first embedding 0, hence is zero. Thus P = π(Xy ) has n = |Xy |
points. Every counted directed edge projects to an ordered planar unit-distance pair, and each unordered
pair is counted at most twice, so
                                                           1
                                                   ν(P ) ≥ Dy .
                                                           2
Combining with n ≤ eBf gives
                                                  1          1
                                         ν(P ) ≥ neγf /2 ≥ n1+γ/(2B) .
                                                  2          2
After discarding finitely many j, the factor 1/2 is absorbed into a slightly smaller exponent.
    Known graph bounds do not create a contradiction here. The average directed degree is about eγf /2 ,
while n ≤ eBf . If q were tiny and B too small, this would look incompatible with even the trivial Dy ≤ n2 ,
and with Szemerédi-Trotter if the exponent exceeded 1/3. But Chebotarev lets the marked rational primes
be chosen as large as desired. Enlarging q enlarges B and shrinks the final δ. Only δ > 0 is needed. Thus
the pb may be chosen so large that B is far bigger than γ. The construction already forces n ≥ eγf /2 , but
choosing huge q keeps the construction visibly consistent with all the known upper bounds.
    The class-number estimate needs an exponential-in-degree bound, not an en log n bound. Let L have
degree n and rd(L) ≤ A. Minkowski gives an integral ideal representative of every class with norm
                                                           √
                                                 ≤ X = (C A)n .

The number of ideals of norm m is bounded by the n-fold divisor function dn (m), since

                                                  ζL (s) ≤ ζ(s)n

coeﬀicientwise. For X = ecn ,                         X
                                                           dn (m)
                                                   m≤X

is at most something like
                                                      (1 + log X)n−1
                                               C nX                  .
                                                          (n − 1)!
Since log X = cn, the factor (cn)n /n! is exponential in n, not superexponential. Thus

                                                 h(L) ≤ C(A)n .


                                                           100
                                                        f
In this application n = [Kj : Q] = 2fj , so this is H` j , with log H` = O(log A` + log log A` ) = O(` log `).
    On the arithmetic side, the entropy inequality is

                                              2tfj
                                   |Uj | ≥          ≥ exp((t log 2 − log H` )fj ).
                                             h(Kj )

Here t  d(G)2 ≥ c`2 , while log H` = O(` log `). So for ` large,

                                              γ = t log 2 − log H` > 0.

The chosen split primes can be astronomically large and affect q, B, and therefore the final exponent, but
they do not enter γ.
    The choice of pb uses E/F corresponding to G/Φ(G). Choose rational primes splitting completely in
the normal closure over Q of E(i). Then each such p splits in F , say pOF = vv ′ . Since it splits in E, the
Frobenius of each of v, v ′ in G/Φ(G) is trivial. Hence the Frobenius elements in G lie in Φ(G). Kill all 2t of
them. In every finite subextension of the resulting quotient, the primes v, v ′ split completely. And because
p ≡ 1 (mod 4), after adjoining i each degree-one prime above p splits into two degree-one conjugate primes
of Kj . This gives exactly tfj conjugate pairs: for each of the t rational primes and each of the fj = [Fj : Q]
primes of Fj above it.
    Those primes need not be principal in F or Fj . Frobenius-in-Frattini is the right condition for the tower,
and ordinary class pigeonhole in Kj is the right condition for producing α.
    Roots of unity or unit ambiguity in choosing α do not collapse the construction. If α is replaced by
wα , then u changes by w/c(w). For a general unit in a CM field over a totally real field, this quotient is
a root of unity up to the standard CM unit theorem. But no quotient by that ambiguity is needed. Choose
one generator for each principal ideal. The valuation vector of u at the selected primes is fixed by  − η,
and distinct ’s have distinct valuation vectors. Multiplication by a unit does not change valuations. So
distinctness is safe.
    Also, all conjugates of u have modulus 1, but this does not force u to be a root of unity, because u is
generally not integral. The denominators at the selected primes are exactly what evade Kronecker’s theorem.
The simple Gaussian example (2 + i)/(2 − i) is the right mental model: all complex conjugates lie on the
unit circle, but it is not an algebraic integer or root of unity.
    The finite tower fields Fj can be chosen with fj → ∞. The quotient pro-2 group is infinite and profinite,
hence it has finite quotients of arbitrarily large order; taking a descending chain of open normal subgroups
gives nested finite Galois extensions. All are totally real and unramified over F . So fj → ∞.
    The field Kj = Fj (i) is then CM, and Kj /Fj has relative discriminant dividing (4). Since Fj /F is
unramified,
                                                 rd(Fj ) = rd(F ),
and
                                          rd(Kj ) ≤ 2 rd(Fj ) = 2 rd(F )
up to the harmless exact convention for the factor 2. This is uniform in j.
    For the asymptotic quantifier, fix one large ` and one fixed set of marked primes. The construction gives
a sequence nj → ∞ and planar sets Pj with

                                                    ν(Pj ) ≥ nj1+δ

for some fixed δ > 0. Given any proposed constant C and threshold N , take j large enough that nj ≥ N ,
log log nj > 0, and
                                                C
                                                       <δ
                                            log log nj
or < δ/2 if the exponent has been shrunk to absorb constants. Then
                                                                  1+C/ log log nj
                                        ν(nj ) ≥ ν(Pj ) > nj                        .

So this is the negative alternative, not merely a lower bound of Erdős type.


                                                            101
    External structural theorems about unit-distance graphs in algebraic directions do not immediately forbid
this. For a fixed finite set of k directions, one can get about kn edges by a grid-like generalized arithmetic
progression in those directions, but the size of that progression...
    There is also a purely additive obstruction to check. If k unrelated unit directions are used to realize
many translates, the number of points ought to blow up exponentially in k unless there are additive relations.
Here the directions live inside one additive lattice, so there are enormous additive coincidences. A box in a
rank-N lattice with translations by many lattice vectors can have about kn directed incidences if the vectors
are short relative to the box. That is exactly what the model-set averaging exploits.
    Compare this with the known ”low rank directions” technology. There is that result, attributed in these
notes to Schwartz / subspace theorem methods: if all unit directions lie in a multiplicative group of rank
r ≤ c log n, then the number of unit distances is n1+ε , with c depending on ε. In this construction the
direction group has rank roughly

                                                    m = tfj ,
   while

                                                  log n  Bfj .
   So the rank is linear in log n, with coeﬀicient t/B. That coeﬀicient might be huge, or at least not below
the small threshold supplied by the subspace theorem for a given ε. Thus there is no contradiction with that
kind of theorem. The directions are high-rank S-unit directions.
   The lattice count has the expected scale. The lattice is

                                              Λj = q −2 OKj ⊂ Cfj .
    It has real rank 2fj . The direction set Uj has size exp(γfj ). It must fit inside the number of lattice points
in the difference window W − W . The crude packing bound says the number of Λj -points in a polydisc of
radius 2R is at most

                                               (CRq 2 )2fj = eBfj .
    The split rational primes, hence q, may be chosen huge; in any case B is finite and can be made larger
than γ if desired. Each u ∈ Uj has every complex coordinate of modulus 1, so for R ≥ 1 it certainly lies
in the relevant difference window. Thus the count is plausible: the construction is not trying to put more
directions into the bounded denominator lattice than packing allows.
    For the arithmetic tower, the quotient fields Fj come from killing Frobenius classes of the marked primes.
The prime pairs upstairs are indexed as follows. For each rational pb , complete splitting is arranged in every
Fj . Then in Kj = Fj (i), because pb ≡ 1 (mod 4), each degree-one prime of Fj above pb splits into two primes
exchanged by the CM involution c. So there are exactly fj conjugate pairs for each pb , hence m = tfj pairs
overall. The automorphism c is only over Fj , not a permutation of the rational primes pb ; no two different
b’s are getting identified.
    The ordinary class number h(Kj ) is used only for pigeonholing the ideals
                                                   Y      Y
                                             A =      Ps     cPs .
                                                   s =1      s =0

   These ideals do not have to be coprime to each other. The class map still makes sense. If , η are in one
ideal class, then

                                                  A A−1
                                                      η = (α )

   for some α . Then
                                                            α
                                                   u =           .
                                                           c(α )
   At a selected prime Ps ,


                                                       102
                                                 vPs (α ) = s − ηs ,
   and at cPs it is the opposite contribution relative to the conjugate selected ideal. Therefore for the
quotient by the conjugate,

                                             vPs (u ) = 2(s − ηs ),
    and at cPs it is −2(s − ηs ). Thus
                                   Q    the only negative valuations are −2, and only at primes over the
rational marked primes. Since q = b pb , multiplying by q 2 adds valuation 2 at every prime above every pb .
Hence

                                                    q 2 u ∈ O K j .
     So u ∈ q −2 OKj = Λj as an additive lattice vector. This is not merely a multiplicative S-unit statement;
it is the exact additive denominator control needed.
     The norm-one property is also fine. For every complex embedding σ in the chosen CM setting,

                                                   σ(cα) = σ(α)
   because the restriction to Fj is real and c is the nontrivial automorphism over Fj . Therefore

                                                           σ(α )
                                            |σ(u )| =                 = 1.
                                                           σ(α )
    For projection, a unit segment in the plane could be overcounted if several high-dimensional pairs pro-
jected to the same two planar endpoints. Projection to the first complex coordinate is injective on a coset
y + Λj : if two points x, x′ in that coset have the same first coordinate, then x − x′ ∈ Λj is a field element
whose first embedding is 0; an embedding is injective, so x − x′ = 0. Thus projected endpoints determine
the full endpoints.
    Also, an ordered pair in Xy determines u uniquely, namely u = x′ − x. Even if some other algebraic u′
has the same first complex value, it cannot be the difference of the same full endpoints unless u′ = u. And
if −u ∈ Uj , then the reversed orientation may also be counted; that is the only duplication. So the passage
from directed pairs to unordered planar unit segments loses at most a factor 2.
    Boundary issues in the averaging are standard. The average is over the compact torus Vj /Λj ; for a
product of closed disks the boundary has measure zero. If necessary, choose the translating coset generically.
The expectation formulas are unaffected.
    The averaging-to-size argument gives the point count lower bound. Let W be the product of fj disks of
radius R, and

                                             Xy = (y + Λj ) ∩ W.
                                                                                                     f
    For each u ∈ Uj , all coordinates of u have modulus 1, so the volume of W ∩ (W − u) is aRj , while
           f
vol(W ) = bRj . Let
                                                             aR
                                                      cR =      .
                                                             bR
   Averaging gives a translate with
                                                               f
                                                 Dy ≥ |Uj |cRj |Xy |.
   Since |Uj | ≥ eγfj , choose R so large that

                                                  log cR > −γ/2.
   Then

                                                 Dy ≥ eγfj /2 |Xy |.


                                                         103
   But each directed pair is an ordered pair of points, so

                                                   Dy ≤ |Xy |2 .
   Hence for the good coset,

                                                |Xy | ≥ eγfj /2 .
   Thus the constructed planar point counts nj go to infinity; the argument is not producing many edges
on a bounded number of points.
   Packing gives the upper side. If x 6= x′ in Xy , then

                                            λ = x − x′ ∈ q −2 OKj .
   Set β = q 2 λ ∈ OKj \ {0}. Then

                                                                  Y
                                                                  fj
                                     1 ≤ |NKj /Q β| = q 2·2fj           |σr (λ)|2 ,
                                                                  r=1
   so

                                             Y
                                             fj
                                                   |σr (λ)| ≥ q −2fj .
                                             r=1

   At least one coordinate has modulus ≥ q −2 . Therefore the points of Xy are q −2 -separated in the sup
norm, and inside a product of disks radius R there are at most

                                              (CRq 2 )2fj = eBfj
   of them. Combining this with the directed-pair lower bound gives
                                            1       1          1 1+γ/(2B)
                                 ν(Pj ) ≥     Dy ≥ nj eγfj /2 ≥ nj        .
                                            2       2          2
   Eventually the factor 1/2 is absorbed, say by replacing the exponent increment by δ = γ/(4B). Since
nj → ∞, this gives n1+δ
                    j    for all suﬀiciently large j.
   The quantifier extraction stays explicit. Given arbitrary constants C0 > 0 and N , choose j with nj ≥ N
and
                                                    C0
                                                           < δ.
                                                log log nj
   Then
                                                              1+C0 / log log nj
                                      ν(Pj ) ≥ n1+δ
                                                j   > nj                          .
    So a fixed positive δ, however microscopic, suﬀices.
    The marked primes are chosen after the Frattini quotient field E/F is known. That is existential but
legitimate: E is a finite extension. Choose rational primes splitting completely in the normal closure over Q
of E(i), and avoid 2D. By Chebotarev there are infinitely many, and indeed as large as desired. Splitting
in i gives pb ≡ 1 (mod 4). Splitting in the normal closure guarantees splitting in F and in E above every
prime over pb . Therefore each base Frobenius element maps trivially to G/Φ(G), i.e. lies in Φ(G).
    When these Frobenius elements are killed in the maximal totally real unramified pro-2 group G, take
closed normal closures. Since Φ(G) is closed normal and contains the chosen Frobenii, the normal subgroup
killed is contained in Φ(G). Thus the quotient has the same generator rank. Relation rank increases by at
most the number of killed elements – in this setup 2t, because a rational pb has two primes in the quadratic
base F . Then Golod-Shafarevich still applies because

                                            r(G) + 2t < d(G)2 /4.


                                                        104
    For a finite pro-2 group the relevant Golod-Shafarevich inequality gives r > d2 /4. So the quotient is
infinite. Its finite quotients give the Fj , and in that quotient tower the marked primes split completely
because their decomposition groups were generated by the Frobenius elements that were killed. There is no
ramification introduced: a quotient of an unramified extension remains unramified. The fields remain totally
real because the starting extension was the maximal totally real unramified extension.
    For root discriminants, Fj /F is unramified, so rd(Fj ) = rd(F ). Then Kj = Fj (i) ramifies only over
primes above 2 in addition to what is already in Fj . A crude discriminant estimate gives

                                                      rd(Kj ) ≤ 2 rd(F )
    or maybe 4 rd(F ) depending on the normalization of the relative discriminant of adjoining i. The exact
absolute constant is irrelevant; use A` = C rd(F ). The point is bounded in j.
    Also Fj cannot already contain i, since it is totally real. For a marked prime pb , because it splits
completely in Fj , every residue field is Fpb . Since pb ≡ 1 (mod 4), x2 + 1 splits over that residue field, so
the prime splits in Kj .
    For a degree n number field L with root discriminant ≤ A, Minkowski gives a representative ideal in each
class with norm
                                                              √
                                                      ≤ X = (C A)n .
   The number of ideals of norm m is at most dn (m), the n-fold divisor function. Then
                                              X
                                                  dn (m)
                                                         m≤X
                                    n
   must be bounded by C(A) . The standard estimate is via the simplex integral:
                                               X                    (1 + log X)n−1
                                                   dn (m) ≤ C n X
                                                                        (n − 1)!
                                           m≤X

               OA (n)
   for X = e            . Stirling turns the factor (log X)n /n! into eOA (n) , not en log n . Thus
                                                                       f
                                                        h(Kj ) ≤ H` j
   with log H` = O(` log `), because log rd(F ) = O(` log `) for the chosen real quadratic base. Then

                                                     γ = t log 2 − log H`
    is positive for large `, since t  ` . This is the entropy inequality.
                                           2

    Known upper bounds remain compatible with the construction. If B were too small compared to γ,
the displayed lower bound might exceed n4/3 , contradicting the established incidence bound. But there is
complete freedom to choose the Chebotarev primes very large, so q and hence B = 2 log(CRq 2 ) can be made
as large as desired. A large exponent is unnecessary; any positive δ beats 1/ log log n along the tower. To
keep the construction visibly compatible with O(n4/3 ), simply choose the marked pb large enough that B is,
say, > 4γ. This extra size choice is optional.                                                 Q
    The √genus-field input to d(G) is as follows. Choose primes ri ≡ 1 (mod 8), set D =          ri , and let
F = Q( D). The multiquadratic field
                                                          √            √
                                                    M = Q( r1 , . . . , r` )
   is totally real, contains F , and has degree 2`−1 over F . The discriminant calculation is
                                                             ℓ−1
                                               |DM | = D2          = |DF |[M :F ] .
    So M/F is unramified at finite primes; total reality handles infinity. Therefore the maximal totally
real unramified pro-2 group G has an elementary abelian quotient of rank at least ` − 1, so d(G) ≥ ` − 1.
Shafarevich gives a relation bound r(G) ≤ d(G) + C0 in this fixed quadratic-base situation – more generally



                                                              105
r − d is bounded by a function of r1 , r2 , here absolute. For p = 2 there may be a δ term, but still constant.
Thus the t = bd2 /100c choice is safe for large `.
    There is also no finite pro-p presentation issue. Killing an element of Φ(G) by its closed normal closure
adds one relator in a minimal presentation; killing all conjugates is exactly what a normal relator means. So
adding 2t marked Frobenius relations is counted correctly. If the element has finite order already, setting it
to 1 is still at most one extra relation.
    For no overcounting in the plane, if x, x′ ∈ Xy and x′ = x + u, then the projected segment has endpoints
π(x), π(x′ ). Suppose the same ordered planar pair arose from (x̃, ũ). Injectivity of π on the coset gives x̃ = x
and x̃ + ũ = x′ , hence ũ = u. So directed projected incidences are counted once. For unordered edges, at
most the two orientations. Roots of unity or different algebraic directions with the same first-coordinate
phase are irrelevant, because the full endpoints determine the full difference.
    The arbitrary translate y might be transcendental. That is fine: Pj is just a finite set of complex numbers.
Unit distances depend on differences, and the differences are the algebraic u’s. The injectivity argument uses
differences in Λj , not algebraicity of y.
    For the averaging formula, ”for almost every y” or measurable indicator functions remove boundary fuss.
The integral identities over Vj /Λj are standard:
                                         Z
                                                                  vol W
                                           |(y + Λj ) ∩ W | dy =          ,
                                                                 covol Λj
    and similarly for pair counts with W ∩(W −u). Since only existence of a translate is needed, measure-zero
boundary ambiguity is harmless.
    The selected pb split completely in every Fj because Frobenius was killed in the quotient tower. If the
tower fields are not Galois over Q, that does not matter. Over F they are Galois finite subextensions of the
quotient pro-2 extension. A rational pb splits into two primes in F ; each of those has trivial Frobenius in
the quotient, so each splits completely in Fj /F . Therefore pb splits completely over Q in Fj .
    The finite subextensions Fj can be chosen with degrees fj → ∞, because an infinite profinite group has
finite quotients of unbounded order. They need not be nested, though they can be.
    No monotonicity of ν(n) or assertion for all n is needed. The negative resolution only needs, for every
proposed C0 , N , one n ≥ N . Here n = nj is an exact cardinality of a constructed set.
    There is a notation point in the CM identity: σ(α) is the ordinary complex conjugate of the complex
number σ(α), not a conjugate embedding chosen independently. Because Fj is totally real and c is complex
conjugation over Fj , for every complex embedding σ of Kj one has σ(cα) = σ(α).
    The tower, the CM S-units, the lattice model, and the projection all have to fit together without losing
the fixed exponent gain δ.                                         √                   Q
    In the p = 2 version the base is a real quadratic F = Q( D) with D =                  ri , ri ≡ 1 (mod 8). The
                     √         √
genus field M = Q( r1 , . . . , r` ) is totally real and unramified overpFQ. The discriminant identity  Q has to be
exactly right. For all ri ≡ 1 (mod 4), every quadratic subfield Q(          i∈S r i ) has discriminant    i∈S ri . In
the multiquadratic field M , each ri appears in exactly 2`−1 nontrivial characters, so
                                                              ℓ−1
                                                   DM = D 2         .

Also DF = D and [M : F ] = 2`−1 . Hence
                                                                [M :F ]
                                         NF/Q dM/F = DM /DF               = 1.

So finite primes are unramified. It is totally real too. Thus the narrow 2-class tower group has generator
rank at least ` − 1. Ordinary versus narrow can change a constant or one rank, but this genus field really is
inside the totally real unramified extension.
    For relation rank, use a maximal totally real unramified pro-2 extension G and a Shafarevich bound
r(G) ≤ d(G) + O(1). For p = 2 and real places, if infinite primes are allowed to complexify, there are
order-two decomposition groups; if total reality is imposed, those are killed. Over a real quadratic base that
adds only a bounded number of relations. The usual Shafarevich/Poitou-Tate estimate for S = ∅, with real
places split, gives r − d bounded by the unit contribution / infinite-place contribution, i.e. constant here.
At the scale d2 this is harmless.


                                                        106
    Choose rational primes pb splitting in the Frattini quotient field E – more precisely in the normal closure
of E(i), so that they split in F , in E/F , and in Q(i). If pb splits completely in E, then for each of the two
primes v | pb of F , the Frobenius in G/Φ(G) is trivial; equivalently the Frobenius element of G lies in Φ(G).
Killing the Frobenius at every such v adds one relator per base prime. There are 2t of them. Since these
relators lie in the Frattini subgroup, the generator rank remains d, and the relation rank is at most r(G) + 2t.
If t is something like d2 /100, then for large d

                                                r(G) + 2t < d2 /4,

so Golod-Shafarevich still forces the quotient to be infinite.
    Killing Frobenius is enough to force complete splitting in every layer. In the maximal unramified pro-2
extension, inertia is trivial at v, and the decomposition group is the procyclic closure of Frobenius. If one
quotients by the closed normal subgroup generated by one Frobenius representative, the whole decomposition
group maps trivially. In every finite quotient, v splits completely. For a rational pb split in F/Q, that gives
degree-one primes in every Fj , even if Fj is not Galois over Q: splitting completely over F leaves residue
field Fv = Fpb .
    So the class field tower part is, at least formally, standard. There are known constructions of towers
with finite prescribed sets of split primes; the Frattini trick is exactly the way to keep the Golod-Shafarevich
deficiency.
    Let Kj = Fj (i), with complex conjugation c. For each selected rational prime pb , since pb ≡ 1 (mod 4)
and splits completely in Fj , it splits completely in Kj , and the primes come in c-paired primes. Choose one
prime from each pair:
                                           Ps , cPs ,     s = 1, . . . , tfj
where fj = [Fj : Q]. For a sign vector  ∈ {0, 1}tfj , define
                                                 Y
                                           A =       Pss (cPs )1−s .
                                                     s

All these ideals have the same norm. Pigeonhole by the class group of Kj : in a fibre of size at least 2tfj /h(Kj ),
fix η and for each  in the fibre choose
                                              (α ) = A A−1
                                                           η .

Then set
                                                  u = α /c(α ).
For every embedding σ : Kj ,→ C compatible with a real embedding of Fj , σ(cα) = σ(α), so

                                                    |σ(u )| = 1.

This is the key ”unit direction” property.
   Kronecker’s theorem does not kill this: u is generally not an algebraic integer. It is an S-unit. An alge-
braic integer all of whose conjugates have modulus 1 is a root of unity; an S-unit with bounded denominator
can have this norm-one CM form.
   The denominator works exactly as required. At a selected pair,

                     vPs (α ) = s − ηs ,     vcPs (α ) = (1 − s ) − (1 − ηs ) = −(s − ηs ).

Therefore                                                          
                                vPs (u ) = (s − ηs ) − −(s − ηs ) = 2(s − ηs ),
                                                                                        Q
and similarly the opposite valuation at cPs . Thus valuations are in {−2, 0, 2}. If q = b pb , then q 2 u ∈ OKj .
So u ∈ q −2 OKj . This universal denominator is independent of j.
   Distinctness of the u ’s is another possible collapse. Suppose u = u′ . Then β = α /α′ satisfies
β/cβ = 1, so β is fixed by c, i.e. β ∈ Fj . Its ideal in Kj is A A−1
                                                                   ′ . But for an element of Fj , the valuations
at Ps and cPs must be equal; here they are s − ′s and the negative of that. Hence all differences vanish.
So  = ′ . Also, if two first-coordinate complex numbers agree, σ1 (u − v) = 0, and an algebraic number with
one conjugate zero is zero; so projection does not identify distinct directions.


                                                         107
   The class-number loss must satisfy

                                        |Uj | ≥ exp((t log 2 − log H` )fj )

with H` independent of j. Since the tower is unramified over fixed F , and adjoining i only changes root
discriminant by a bounded factor, the fields Kj have bounded root discriminant. Bounded root discriminant
gives h(Kj ) ≤ H [Fj :Q] unconditionally, via Minkowski plus ideal counting, not via any delicate Brauer-Siegel
lower bound on regulators.
    Let N = [L : Q], root discriminant A. Every ideal class has an integral representative of norm at most
                                                         √
                                                 X = (C A)N

after absorbing the N !/N N Minkowski factor into C N . The number of ideals of norm m is at most dN (m),
because over a rational prime the choices of ideal exponents are bounded by the number of N -tuples of
exponents. Then                                 X
                                                    dN (m)
                                                  m≤X

is at most exponential in N when log X = O(N ); for instance the standard divisor-sum estimate gives
something like
                                      (1 + log X)N
                                   X               ≤ exp(O(N )).
                                           N!
                                                      f
So h(L) ≤ H N . In this notation this is h(Kj ) ≤ H` j , up to changing H` .
    Quantitatively log H` = O(` log `) because the root discriminant of F is roughly D1/2 and D is the product
of ` auxiliary ramified primes. Meanwhile t was chosen quadratic in d, and d ≳ `. Thus t log 2 − log H` > 0
for large `. The Chebotarev primes pb may be absurdly large, but they do not enter this class-number
exponent; they enter the denominator q later.
    Let V = Cfj under the CM embeddings, and let

                                                 Λj = q −2 OKj

in its Minkowski embedding. This is a full lattice, so V /Λj is compact. Take a polydisc WR . For a coset
y + Λj , let Xy = (y + Λj ) ∩ WR . For every u ∈ Uj ⊂ Λj , translation by u preserves the coset. Since every
                                                                                              f
coordinate of u has modulus 1, the volume of the overlap WR ∩ (WR − u) is a fixed fraction ρRj of vol WR if
R is chosen > 1. Averaging over the torus gives a relation of the form
                                                                f
                                             EDy = |Uj |ρRj E|Xy |.

Choosing R so that the overlap penalty is dominated by the positive direction exponent, there is a coset
with
                                           Dy ≥ eγfj /2 |Xy |
where γ = t log 2 − log H` > 0.
    The point count upper bound converts the exponential degree into a power of n. If two lattice points
differ, their difference is a nonzero algebraic number in q −2 OK . A nonzero algebraic integer has some
conjugate of modulus at least 1 because the product of conjugate moduli is a nonzero integer. Therefore a
nonzero element of q −2 OK has some coordinate of modulus at least q −2 . Thus in sup norm the lattice points
are q −2 -separated in at least one coordinate. Balls of radius q −2 /2 are disjoint. Inside a polydisc of radius
R, the number of lattice points is at most
                                                  (CRq 2 )2fj .
So for the chosen coset,
                                               nj = |Xy | ≤ eBfj
with B depending on R, q and the fixed base but not on j.




                                                          108
   Projection to the first complex coordinate is injective on y + Λj , because if two embedded algebraic
numbers have the same first coordinate, their difference has one zero conjugate and hence is zero. For every
counted directed pair x 7→ x + u, the projected Euclidean distance is

                                                 |σ1 (u)| = 1.

Unordered pairs can be overcounted by orientation and perhaps by u versus −u, but since the endpoints
determine the difference in the lattice, this is only a constant issue. Thus
                                                        1 γfj /2
                                             ν(Pj ) ≥     e      nj
                                                        2
after projection.
    Also Dy ≤ nj (nj − 1), so the chosen set is not empty and in fact nj grows at least exponentially when
fj does. Combining with nj ≤ eBfj , choose for example

                                                 δ = γ/(4B).

Then eγfj /2 ≥ n2δ
                j , hence certainly
                                                ν(Pj ) ≥ nj1+δ
for all suﬀiciently large j, after absorbing the 1/2. This is the contradiction to the Erdős upper scale.
    Several failure modes are still worth checking.
    Planar points may all lie in a fixed bounded disk, but that does not itself bound unit distances more
strongly. There is no minimum separation after projection; points can cluster arbitrarily. Extremal graph
constraints still allow superlinear graphs. Unit distance graphs have no K2,3 , giving only a Kővári-Sós-Turán
O(n3/2 ), and Szemerédi-Trotter / crossing gives O(n4/3 ). A tiny positive δ need not contradict those.
    Projection does not identify different high-dimensional edges with the same planar edge. Endpoints are
injected. If two high-dimensional pairs project to the same unordered pair, the endpoints coincide in the
high-dimensional coset. The difference u is then determined. So no large multiplicity is being counted.
    Tsfasman-Vlăduţ, Odlyzko, or Brauer-Siegel do not obviously prohibit towers with many split primes.
In a bounded-root-discriminant
          P                        tower, completely split degree-one primes contribute to the basic inequality
                    √
roughly      log p/( p − 1). But the marked primes can be chosen arbitrarily large by Chebotarev. The sum
can be made small even if the number t is large. Their largeness makes q enormous and δ minuscule, but
positive is enough: n = eBfj and fj → ∞, so eventually any fixed δ > 0 beats C/ log log n.
    The marked primes do not force class numbers in the tower to grow faster than the crude root-discriminant
exponential. Analytically the zeta residue has Euler factors for split primes, but for huge pb the factor
(1 − 1/pb )−fj is negligible. In any case the elementary ideal-counting upper bound from root discriminant
is unconditional. It cannot become superexponential in degree.
    Northcott or Dobrowolski do not limit the number of norm-one elements with fixed denominator here.
The absolute logarithmic height of these u’s is O(log q), independent of j, while the degree grows. Northcott
is only finite for bounded degree. Dobrowolski gives lower bounds for non-torsion height; this height is not
tending to zero.
    The u ’s also do not all lie in a low-rank multiplicative group with fatal coincidences. The valuation
vectors at the split prime pairs have rank tfj in the anti-invariant S-unit group. The construction chooses
a large subset modulo ideal classes. The distinctness valuation argument is robust.
    For Kj = Fj (i), root discriminant at 2 stays controlled. Since ri ≡ 1 (mod 8), 2 splits in F . The tower
Fj /F is unramified at finite primes; locally above 2 it may be an unramified extension of Q2 . Adjoining i
is the same ramified quadratic base change at those local fields. The relative discriminant contribution is
a fixed power per local degree; the root discriminant factor is bounded. So the class-number constant H`
stays fixed along the tower.
    The assertion that an unramified tower with split marked primes exists over a real quadratic field while
remaining totally real is the least elementary piece. Let G be the Galois group of the maximal extension
unramified at finite primes and split at real places. Its abelianization is the narrow 2-class group. The genus
field gives d(G) ≥ ` − 1. Shafarevich gives a finite presentation with r(G) ≤ d(G) + O(1). Let E be the fixed



                                                     109
field of Φ(G). Pick rational primes split completely in the normal closure of E(i). For every base prime v
over one of them, choose a Frobenius element xv ∈ G. Because v splits in E, xv ∈ Φ(G). Form
                                                  G = G/hhxv ii.
A presentation of G with d minimal generators lifts xv to words in the Frattini subgroup of the free pro-2
group, so adding xv = 1 adds relations of degree at least 2. Thus
                                               r(G) ≤ r(G) + 2t.
If this is below d2 /4, Golod-Shafarevich says G is infinite. The corresponding fixed field is a totally real
unramified pro-2 extension of F , and every marked v has trivial decomposition group. This is exactly the
required tower.
    This still holds if Fj are not normal over Q, because everything is Galois over F . The rational primes
were split in F and then all primes over them split in Fj /F .
    Kronecker, projection collapse, the fixed denominator, the class-number bound, marked Frobenius, real
places, root discriminant, and packing all need to stay compatible. None of them breaks the mechanism at
this stage.
    The averaging itself is straightforward. It is over V /Λ, not over all of V , so compactness is fine. The
window WR is a measurable subset of V ; for a random translate y+Λ, the expected number of lattice points in
WR is vol(WR )/ covol(Λ). For pairs with difference u, the expected number is vol(WR ∩ (WR − u))/ covol(Λ).
No independence is needed. Summing over u ∈ Uj gives the directed count expectation. Then the ratio of
expectations is exactly the overlap ratio times |Uj |, so some translate has at least that ratio of directed pairs
to vertices, unless the denominator is zero; and for large volume, or by the same expectation, nonempty
translates exist. The later inequality D ≤ n2 forces n large anyway once D ≥ ecf n.
    Also the first-coordinate distance is exactly one, not merely at most one, because |σ1 (u)| = 1. The
vertices themselves need not be algebraic integers; they are in a coset of q −2 OK , and after projection are
just complex numbers. Distinctness does not require the coset representative y to be algebraic: if two points
in the same coset project equally, their difference is in Λ, hence algebraic, and has first embedding zero.
    The p = 2 narrow-tower bookkeeping is still the most convention-sensitive part, because the relevant
theorems keep track of ramification at infinity and of the prime 2. An odd-prime tower, while keeping the
CM field K = Fj (i) for the geometry, would avoid much of that bookkeeping. Large class rank gives a
tower, the Frattini quotient lets one prescribe t  d2 rational split primes, those primes give 2tfj CM S-unit
directions up to an exponential class-number loss, and the Minkowski lattice / random translate / projection
argument converts that into planar unit distances with exponent 1 + δ, where δ > 0 may be extremely small
because q may be extremely large.
    The fields Fj , their degrees fj , and the class-number estimate after adjoining i deserve a separate check.
Take a chain of finite quotients of an infinite pro-2 group; the fixed fields Fj /F are finite Galois 2-extensions,
unramified over F and totally real. They should be linearly disjoint from Q(i) simply because Fj is totally
real, so the intersection with Q(i) is Q. Thus Kj = Fj (i) has degree 2fj over Q, where fj = [Fj : Q].
    At 2, adjoining i over Fj could appear to introduce a wild exponent that grows with the local unramified
degree. Locally, over an unramified extension L/Q2 of degree n, the extension L(i)/L is the base change
of Q2 (i)/Q2 . The polynomial x2 + 1 has discriminant −4; even if OL [i] is not the maximal order in every
formulation, the discriminant exponent is bounded independently of n – in fact exponent 2 in the base-change
situation. So the relative discriminant norm is 4[L:Q2 ] at each contribution. Globally this gives

                                             |DKj | = |DFj |2 · 4[Fj :Q]
   up to the same bounded local factor; hence

                                               rd(Kj ) ≤ 2 rd(Fj )
       3/2
   or 2 rd(Fj ) if the local exponent is off by one. It is still a constant factor. Since the tower is unramified
over F , rd(Fj ) = rd(F ).
                                                1/2
   For the base real quadratic F , rd(F ) = DF , not DF . This only improves the estimate: if DF is the
product of the chosen ramified primes, log rd(F ) = O(` log `). The class number bound needed for Kj is
then of the form


                                                        110
                                                                             f
                                                          h(Kj ) ≤ H` j
    with log H` = O(` log `). Bounded root discriminant gives this by Minkowski plus a count of ideals: every
class has an integral ideal of norm ≤ C [Kj :Q] |DKj |1/2 , and the number of ideals of norm ≤ exp(O(fj )) is
exp(O(fj )), with the implied constant depending only on the root discriminant bound. So that part is not
secretly polynomial in the discriminant; it is exponential in the degree, as required.
    For the split primes, if a rational prime pb splits completely in Fj , it gives fj primes of Fj . If moreover
pb ≡ 1 (mod 4), then after adjoining i each of those primes splits into a conjugate pair in Kj /Fj . Thus for
one rational marked prime there are fj pairs (Ps , cPs ); for t rational primes there are

                                                                   m = tfj
   pairs. That is the exponent in the sign-vector construction.
   For that construction, for every sign vector  ∈ {0, 1}m , form
                                                 Y
                                           A =     Pss (cPs )1−s .
                                                               s
                                   fj
                                                 Q
    All these ideals have norm q        if q =       b pb .   Pigeonhole them in the class group of Kj . A fibre has size
at least
                                                                              
                                        2m /h(Kj ) ≥ exp (t log 2 − log H` )fj .
   So if

                                                 γ := t log 2 − log H` > 0,
   there are ≥ eγfj sign vectors in one class.
   For  in that fibre, relative to some base η, choose α with

                                            (α ) = A A−1
                                                        η ,                u = α /c(α ).
   Then at each chosen prime

                                                  vPs (u ) = 2(s − ηs ),
   and at the conjugate prime the valuation is the negative. Therefore different ’s give different u ’s;
duplicates are ruled out by valuations. Also u has no valuations outside the selected primes, and the
exponents are bounded by 2, so

                                                              q 2 u ∈ O K j .
   At infinity, for every complex embedding σ chosen above a real embedding of Fj ,

                               |σ(u )| = |σ(α )|/|σ(cα )| = |σ(α )|/|σ(α )| = 1.
   More prosaically, σ ◦ c is complex conjugation of σ, so the moduli cancel. Kronecker is not a problem
here: these u are not algebraic integers in general; they are bounded-denominator S-units.
   The lattice scaling is

                                                          Λj = q −2 OKj
   inside the Minkowski space Cfj . Scaling by the rational scalar q −2 in each complex coordinate multiplies
covolume by q −4fj . Each u lies in this lattice.
   The packing separation is crude but valid. If λ = q −2 β ∈ Λj \ {0}, then
                                   Y
                                      |σ(λ)| = q −2fj |NKj /Q (β)|1/2 ≥ q −2fj ,
                                        σ




                                                                     111
    where the product is over one embedding from each conjugate pair. Hence not all coordinates can have
modulus < q −2 . So the sup norm of every nonzero lattice vector is at least q −2 . This gives a packing bound
in a product of disks or cubes: a coset of Λj has at most (CR q 2 )2fj points in the fixed window WR .
    The averaging identity is the usual one. For a coset y + Λj , let Xy = (y + Λj ) ∩ WR . Let Dy be the
number of directed pairs (x, x + u) with x, x + u ∈ Xy and u ∈ Uj . Averaging over the torus Cfj /Λj ,
                                                              f
                                              EDy = |Uj |ρRj E|Xy |,
where ρR is the ratio of the overlap area of a disk of radius R with its translate by a unit vector to the disk
area. Since all coordinates of every u have modulus 1, the overlap volume is exactly a product of identical
planar overlaps.
   Choosing R large makes ρR close to 1. Thus, after losing say eγfj /2 , there is a coset with

                                                 Dy ≥ eγfj /2 |Xy |.
                                                                                              f
    The coset step follows because the integral of Dy − A|Xy | is nonnegative for A = |Uj |ρRj , so some y has
Dy ≥ A|Xy |. No probabilistic assumption is needed.
    Project that finite set to the first complex coordinate. Projection does not collapse points on a single
coset: if two points y + λ and y + λ′ have equal first coordinate, then the first embedding of λ − λ′ ∈ Kj is
zero; since an embedding is injective, λ = λ′ . The offset y need not be algebraic. Differences of points in the
coset are lattice elements, and coordinate projection is injective on the coset.
    Each directed difference u projects to a complex number of modulus 1, hence to a planar unit segment.
An unordered edge can be counted at most twice by directed pairs, since the high-dimensional difference is
fixed. Therefore the projected planar set Pj has
                                             1     1
                                  ν(Pj ) ≥     Dy ≥ eγfj /2 nj ,        nj = |Xy |.
                                             2     2
   The packing bound gives

                                                    nj ≤ eBfj
   for some B = B(q, R, rd(Kj )) — actually the elementary packing estimate only needs q, R. Combining,
and absorbing the harmless factor 1/2 for large j, gives

                                        ν(Pj ) ≥ n1+δ
                                                  j   ,           δ = γ/(4B)
    after weakening constants.
    For the tower, take t  d2 marked rational primes that split through the whole tower. The group-theoretic
recipe is: take G, the Galois group of the maximal totally real unramified√pro-2 extension of a real quadratic
F . Its generator rank d is at least ` − 1 by the genus field if F = Q( D) with D a product of ` primes
1 mod 8. Shafarevich gives relation rank r(G) ≤ d+O(1) in this quadratic case. Then choose rational primes
splitting in the Frattini quotient field E and in Q(i), so their Frobenius elements at the primes of F lie in
Φ(G). Kill those Frobenius elements.
    For each rational prime splitting in F there are two primes of F , so marking t rational primes adds at
most 2t relations. The quotient G has

                                     d(G) = d(G),         r(G) ≤ r(G) + 2t.
   If t = bd /100c, then for large d,
            2


                                                   r(G) < d2 /4,
    so Golod-Shafarevich makes G infinite. Its finite quotients give the Fj , and the marked rational primes
split completely in every Fj . This is the standard “class field tower with prescribed split primes” argument;
the Frattini condition preserves the generator rank.
    A possible arithmetic obstruction is that forcing many primes to split completely in a bounded-root-
discriminant tower might force the class numbers of Kj to be at least 2tfj , exactly cancelling the sign-vector


                                                        112
pigeonhole. That does not follow: a split prime gives many prime ideals, not automatically independent class
group elements. Analytic class number formulas in towers do feel the presence of many split small primes,
but the contribution is weighted by their norms, something like log(p/(p − 1)) or related Tsfasman–Vlăduţ
terms. Here the marked Chebotarev primes may be astronomically large. Their contribution can be tiny
even if their number is t. The bounded-root-discriminant class-number upper bound is not contradicted.
    The group of norm-one S-units with archimedean absolute value 1 also has the needed size. The divisor
calculation says the anti-invariant valuations at split prime pairs are free modulo the finite class-group
obstruction. The product formula imposes degree zero, and these quotient divisors already have norm 1.
Hilbert 90 is exactly producing elements of the form α/cα. Thus the rank is m up to class-group effects.
                                                               √        √                           ℓ−1
    For the root discriminant of F , the genus field M = Q( r1 , . . . , r` ) has discriminant D2       over Q in
the appropriate sense; over F it is unramified. For ` = 3, for instance, each ri occurs in four quadratic
                                                [M :F ]
subfield discriminants, giving D4 , matching DF         . Thus the genus field lies in the unramified tower, and
d ≥ ` − 1. The logarithm of the root discriminant remains O(` log `) if the first ` primes 1 mod 8 are chosen.
    The constants work as needed: t ∼ d2 /100  `2 , while log H` = O(` log `). Hence for ` large,

                                           γ = t log 2 − log H` > 0.
   The selected split primes pb may be huge, so q and B may be huge, and consequently δ may be extremely
small. That is acceptable. Once `, q, and R are fixed, the infinite tower lets fj → ∞, so nj → ∞ and a fixed
positive δ eventually dominates C/ log log nj for any prescribed C.
   The finite fields Fj need not be Galois over Q. If a rational prime p splits in F , and both primes of F
above p split completely in Fj /F , then

                                               Fj ⊗Q Qp ≃ Qfpj .
     So p splits completely in Fj in the sense needed.
     Finite subextensions should be chosen from normal open subgroups of the pro-2 quotient so they are
Galois over F , but any infinite finitely generated pro-2 group has arbitrarily large finite quotients.
     Known obstructions to dense unit-distance graphs do not immediately apply. The projected direction
set lies in a multiplicative group of S-units; its rank is roughly m = tfj . Since log nj ∼ Bfj , the rank is
O(log nj ), with a small constant t/B. Subspace-theorem bounds for S-unit equations are exponential in the
rank, so at this rank scale they do not immediately forbid a polynomial average degree. The graph also
remains below the Kővári–Sós–Turán barrier as long as δ < 1/2; and the marked primes can be enlarged,
increasing q, to make the final δ tiny.
     The points of the high-dimensional coset are not algebraic points under the diagonal embedding if y is
arbitrary. This is harmless. The planar point is just the first coordinate of y + λ. Differences between two
such points are first embeddings of elements of Λj . Thus every counted difference u gives a planar unit
vector, while equality of projected vertices would force the first embedding of a nonzero algebraic number to
vanish, impossible.
     The first-coordinate values of the u’s remain distinct: if two algebraic elements u, u′ ∈ Kj have the same
first embedding, then u = u′ . The valuation argument already separates them.
     Ramification at 2 in Kj = Fj (i) stays within the exponential class-number allowance. If 2 splits com-
pletely in the tower, then Kj /Fj ramifies at many primes over 2, and ambiguous class number phenomena
could add a factor like 2fj to the class number. That is still only exponential with a constant in the exponent;
                     f
it is included in H` j . It cannot cancel 2tfj once t is quadratic in ` and ` is fixed large.
     The comparison with the classical n4/3 upper bound is a useful constants check. The argument does
not produce a large explicit δ. The denominator B contains q, and the Chebotarev primes splitting in the
Frattini quotient and in Q(i) can be very large. If a crude lower estimate for γ and a crude upper estimate
for B ever seemed to give δ > 1/3, that would only mean B was underestimated or the usable constants
were overestimated. Replacing the marked primes by larger split primes makes B larger and δ smaller while
preserving positivity.
     The sizes fit the same comparison. The class-number factor H` is exponential in the degree with constant
depending on the root discriminant. Since the base quadratic discriminant is a product of ` primes, log rd is
O(` log `), so log H` = O(` log `). On the other hand the number t of marked rational primes is of order d2 ,
and d ≥ ` − 1, so t ∼ `2 . Thus


                                                      113
                                              γ = t log 2 − log H`
    is eventually positive, in fact large compared to ` log `. Taking the marked primes pb very large makes B
huge and δ as small as desired. That is fine: the negative conclusion only needs one fixed positive δ.
    An upper bound such as Szemerédi-Trotter, combined with this construction, could only force the primes
to be large through a lower bound on q, on the denominator scale, or on the packing volume. Chebotarev
already permits primes arbitrarily far out.
    For the combinatorial-to-planar part, the point set is a genuine finite set, not a multiset. Projection to
the first complex coordinate is injective on the lattice coset. If two lattice points differ by λ ∈ q −2 OK and
their first coordinates agree, then the first conjugate of λ is zero; hence the algebraic number λ is zero. So
no projection collapse occurs.
    Unordered pairs are also okay. The directed count Dy counts pairs (x, u) with x, x + u ∈ Xy . If two
different u’s gave the same directed planar edge, their first coordinates would be equal; the difference u − u′
would have first coordinate zero, hence u = u′ . And if x + u = x, then u = 0, which is not among the
nontrivial directions. Passing from directed to unordered costs at most the factor two.
    For the tower, the p = 2 real-place issue remains. For a number field k, Shafarevich gives a presentation
bound for the Galois group of the maximal pro-p extension unramified outside a finite set. When p = 2 and k
is totally real, if no condition is imposed at infinity then real places may become complex; the decomposition
group at a real place is an involution. For the maximal totally real unramified pro-2 extension, quotient by
the decomposition groups at the finitely many real places of the base field. That adds only finitely many
relations. In the quadratic base field there are two real places, so this is a constant and does not affect the
d2 /4 margin.
    More explicitly: the maximal extension unramified at finite primes but allowed to complexify has real
decomposition groups of order 2. Killing the decomposition group at each real embedding forces all extensions
in the quotient to be totally real. Since there are only the two real embeddings of the base quadratic field,
this is a finite condition. The relation rank bound for the totally real/narrow group remains

                                             r(G) ≤ d(G) + O(1)
    for this fixed-degree base. The generator rank may drop by at most a constant when the real involutions
are killed; in any case the real genus field is already totally real, so its Galois group maps into the totally
real quotient and gives d(G) ≥ ` − 1.                  √
    The genus-field input is also okay. For F = Q( D), with D a product of many primes congruent to
1 mod 8, the real genus field is the multiquadratic field generated by the square roots of the ramified primes.
It is totally real and unramified over F at all finite primes. Thus the narrow unramified 2-tower group has
Frattini quotient of dimension at least ` − 1.
    Choose the marked rational primes after passing to the Frattini quotient field. If E/F is the elementary
abelian extension corresponding to G/Φ(G), take rational primes splitting completely in the normal closure
of E(i). For each prime of F above such a rational prime, the Frobenius element in G maps trivially to
G/Φ(G), hence lies in Φ(G). Adding the relation “this Frobenius is trivial” is therefore adding a relator in
the Frattini subgroup of a minimal free pro-2 presentation. If all primes above all t marked rational primes
are killed, that is at most 2t additional relators over the quadratic base.
    So the quotient has relation rank bounded by

                                              r(G) ≤ r(G) + 2t,
   and if t is a suﬀiciently small constant multiple of d2 , then

                                                 r(G) < d2 /4
   for d large. Golod-Shafarevich then says the quotient is infinite. The corresponding tower is totally real,
unramified, and all the marked rational primes split completely in it.
   Complete splitting gives the later ideal pairs. In each finite layer Fj , a marked rational prime pb gives
fj = [Fj : Q] primes of residue degree 1. Since pb ≡ 1 mod 4 was also arranged, in Kj = Fj (i) each of those



                                                      114
primes splits into a conjugate pair under complex conjugation. Therefore for m = tfj pairs (Ps , cPs ) form
the sign ideals
                                                Y
                                           A =   Pss (cPs )1−s .
                                                    s

    The class-number pigeonhole then gives a large fibre of sign choices modulo the ideal class group.
    The class-number upper bound must stay exponential rather than ef log f . The fields Fj are unramified
over the fixed quadratic F , so their root discriminants equal rd(F ). The CM fields Kj = Fj (i) have root
discriminant bounded by a constant depending only on F and on the fixed quadratic extension by i. Thus
for L = Kj , with degree n, Minkowski gives an integral ideal representative in every class of norm at most
exp(Cn).                                                            P
    The number of ideals of norm at most X = exp(Cn) is at most m≤X dn (m). The standard estimate
                                       X                 (C ′ (1 + log X))n
                                            dn (m) ≤ X
                                                                  n!
                                      m≤X

   is exp(O(n)) when log X = O(n). Indeed the n! cancels the nn coming from (log X)n . So h(L) ≤ H n .
                                                         f
Since n = 2fj , absorb the factor 2 and write h(Kj ) ≤ H` j . No ef log f loss remains.
   The pigeonhole gives a subset of sign vectors of size at least

                                    2tfj /h(Kj ) ≥ exp((t log 2 − log H` )fj ).
   Fix one sign vector η in the large class. For every other  in the fibre, choose α ∈ Kj× with

                                                 (α ) = A A−1
                                                             η

   and set

                                                 u = α /c(α ).
    There is no archimedean obstruction. For every complex embedding σ of Kj , since Fj is totally real and
c is the CM involution,

                                                 σ(cα) = σ(α).
   Therefore

                                                   |σ(u )| = 1.
   This is the Hilbert-90 normalization: even if the principal generator α has enormous or tiny embeddings,
dividing by its conjugate puts the quotient on every archimedean unit circle. Kronecker does not apply,
because u is not an algebraic integer in general; it is an S-unit with bounded denominator.
   The valuations distinguish the directions. At a selected prime Ps ,

                                             vPs (u ) = 2(s − ηs ),
     up to the sign convention, andQat the conjugate prime it is the negative. Thus different ’s give different
u ’s. Also multiplying by q 2 = b p2b clears all denominators, because all valuations are in {−2, 0, 2} at
selected primes and zero elsewhere. Hence

                                                 u ∈ q −2 OKj .
   This gives the finite set Uj of lattice vectors all of whose complex coordinates have modulus 1, with

                                                   |Uj | ≥ eγfj
   after discarding the base vector and perhaps halving constants.



                                                        115
   The geometry uses the full Minkowski lattice. Although the first-coordinate image σ1 (q −2 OK ) is a dense
additive subgroup of C when the degree is larger than 2, the full embedding

                                              Λ = q −2 OK ⊂ Cf
   is a genuine lattice. So

                                             Xy = (y + Λ) ∩ W
   is finite for a bounded polydisc W . Projection to the first coordinate may produce points very close
together, but it does not identify them.
   For a fixed u ∈ Uj , all coordinates of u have modulus 1. If W is a product of discs of radius R > 1/2,
then the volume of W ∩ (W − u) is a fixed fraction ρfR of vol W , where ρR > 0 and can be made close to 1
by taking R large. Averaging over the torus V /Λ,
                                                           f
                                            EDy = |Uj |ρRj E|Xy |.
                       f
   Choose R so that ρRj |Uj | ≥ eγfj /2 . Then for some coset,

                                              Dy ≥ eγfj /2 |Xy |.
   After projection, each directed edge gives a unit segment in the plane, so
                                                        1 γfj /2
                                             ν(Pj ) ≥     e      nj .
                                                        2
   The packing upper bound for nj is also important. If λ ∈ Λ \ {0}, then the algebraic norm of q 2 λ is
a nonzero integer, so the product of all complex absolute values of λ is at least q −2f in the appropriate
convention. Therefore at least one complex coordinate has modulus ≥ q −2 . Sup-norm balls of radius q −2 /2
around the lattice points are disjoint. Inside the enlarged polydisc this yields

                                                  nj ≤ eBfj ,
   where B depends on q, R and the fixed root-discriminant constants. Thus
                                                           γ/(2B)
                                               eγfj /2 ≥ nj
    up to the usual one-sided adjustment, and δ = γ/(4B) > 0 works for all large j. Making q huge merely
makes δ tiny.
    The classical lower-bound literature suggests checking for a theorem forbidding this projected high-
dimensional lattice. The standard Erdős construction gives n1+c/ log log n , and no known obstruction appears
directly at the n1+δ scale here.
    Abstractly, the projected vertices lie in a finitely generated additive subgroup Γ = σ1 (q −2 OK ) ⊂ C of
rank 2f , and the unit directions lie in Γ ∩ S 1 . A rank-R additive group can have at most exponentially
many unit-circle elements in this kind of algebraic construction; this uses exactly ecR of them. If a naive
box in a basis of Γ were used, the coordinate heights of the unit vectors could be enormous and would force
the box to be enormous. The Minkowski-window construction avoids choosing such a bad additive basis: all
directions are short in every conjugate coordinate.
√ This is   reminiscent of high-dimensional lattice kissing constructions. The u’s have full Euclidean length
  f in Cf , not length 1, but they are uniformly bounded coordinatewise, so the overlap fraction of the
window is only exponentially small in f , which the number of directions beats.
    Tsfasman-Vlăduţ or Brauer-Siegel type considerations do not block this directly. The selected rational
primes split completely in an infinite tower, so they contribute positive splitting data. But only finitely
many primes are selected, and they may be put extremely far out; their contribution to analytic class
number estimates is small, roughly log(p/(p − 1)), not log 2. The ordinary class number bound h(Kj ) ≤ H fj
remains compatible.
    Northcott-type considerations also stay compatible. The infinite tower has bounded root discriminant,
and the marked primes split completely, so local degree at each marked pb is 1 throughout the tower. Infinite


                                                     116
Galois extensions with bounded local degree at one prime have Bogomolov-type height lower bounds, but
the elements here have height about log q, a fixed positive number, not tending to zero. Northcott would
require much stronger local-degree hypotheses. The S-unit group in the union has infinite rank because the
marked primes split into more and more primes.
    The relative class group of Kj /Fj is not forced to contain all these sign choices independently. In a
quadratic extension, ambiguous class number formulas are controlled by ramified primes, not by split primes.
Split primes can generate a large relative subgroup, but there is no analytic reason for 2tf independent classes
when the rational primes are huge. The class-number pigeonhole measures the possible loss.
    The Chebotarev primes can satisfy all conditions at once: split in the normal closure of the Frattini field,
split in Q(i), avoid all ramified primes, and be as large as desired. This is Chebotarev in the compositum,
with a lower cutoff. Then each rational prime has the required two primes over the quadratic base and later
the required conjugate pairs in Kj .
    For the last geometric estimate, if pb is enormous, then for a small window the expected number of lattice
points nj can easily be zero. This is not a contradiction, because the window may be enlarged. For large
window the point count grows, and the lower bound through Dy eventually guarantees a nonempty useful
coset. The size of the marked rational primes only enters the denominator constant and the final exponent.
    The averaging argument also has Dy ≤ n2j . Suppose Uj accidentally contained the same translation
twice. Then Dy , if counted with multiplicity, could count the same ordered pair many times. But for a fixed
ordered pair (x, z) in a coset, the vector is uniquely u = z − x. Treat Uj as a set of elements of Kj , not as
a multiset of sign vectors. If two sign vectors give the same u, the valuations at the split primes force them
to be the same vector. Thus for each ordered pair there is at most one u ∈ Uj . For unordered planar unit
segments both u and −u may occur, but that is only the usual factor 2.
    Projection is another multiplicity check. If two high-dimensional vertices project to the same point in
the plane, everything collapses. But the projection onto one complex embedding is injective on q −2 OKj : if
σ1 (λ) = 0, then the algebraic number λ is zero. Multiplying by the rational denominator does not change
this. Thus two projected endpoints coincide only if the high-dimensional endpoints coincide. Likewise, if
a projected segment of length one were counted by two different directions u, v with σ1 (u) = σ1 (v), then
u − v has first embedding zero, hence u = v. So the planar graph has exactly the expected edges, up to the
oriented/unoriented factor.
    The tower only needs a linear relation-rank bound, not an unnecessarily sharp formula for the 2-tower.
Let G be the maximal totally real pro-2 extension of the real quadratic field, unramified at finite primes.
Genus theory gives d = d(G) of order `. Shafarevich gives a finite presentation and an inequality of the form

                                              r(G) ≤ C1 d + C2 ,

with absolute constants. More concretely, one version is

                                           r(G) ≤ d(G) + dimF2 V,

where V = {a ∈ F ∗ : (a) = a2 , a positive at real places}/F ∗2 , and the exact sequence from units and
Cl(F )[2] gives dim V ≤ d + O(1) for a quadratic field. So r ≤ 2d + O(1) is safe. The stronger r ≤ d + c is
not needed.
    When rational primes are marked in the p = 2 construction, each rational prime splits into two primes
of the base quadratic field, and at most two Frobenius relators are added. If

                                                t = bd2 /1000c,

then the quotient has
                                               r(G) ≤ r(G) + 2t
and, for large d,
                                         2d + O(1) + d2 /500 < d2 /4.
Because the chosen Frobenius elements lie in the Frattini subgroup, the generator rank stays d, and the
Golod-Shafarevich inequality still forces the quotient infinite. A smaller constant such as d2 /500 leaves
comfortable room.


                                                      117
    The marked-prime argument is as follows. The field corresponding to G/Φ(G) is the elementary abelian
narrow unramified 2-extension. If a prime of F splits in that field, its Frobenius in G lies in Φ(G). Rational
primes pb should make every prime of F above pb have that property, and also satisfy pb ≡ 1 mod 4 later.
Choose rational primes splitting completely in the normal closure of the Frattini field together with i. Then
the two base-field primes above pb split in the Frattini quotient and in F (i). Killing their Frobenius conjugacy
classes gives a quotient tower in which pb splits completely in every layer. The normal-closure point matters:
splitting merely in one non-normal field would not simultaneously control the conjugate prime.
    In the tower Fj , form Kj = Fj (i). Since the Fj are totally real, Kj is CM. Since Fj /F is unramified
at finite primes, the root discriminants of the Fj are constant. Also the relative discriminant of adjoining
i divides (4); if the original quadratic F has discriminant a product of primes 1 mod 8, then 2 is at least
harmless, but even in general the root discriminant of Kj is bounded by a constant depending only on the
base field. Thus the elementary class-number upper bound applies: bounded root discriminant implies

                                           h(L) ≤ exp(O([L : Q])).

This follows from Minkowski plus ideal counting, with the number of ideals of norm ≤ C n bounded expo-
nentially in n. No Brauer-Siegel subtlety is needed; this is an upper bound.
   For each marked rational prime pb , in Kj every prime over it occurs in a conjugate pair (P, cP), because
pb ≡ 1 mod 4 and it splits completely in Fj . Number these pairs. If there are m = tfj of them, where
fj = [Fj : Q], and for a sign vector  ∈ {0, 1}m set
                                                  Y
                                            A =     Pss (cPs )1−s ,
                                                   s

                        Q    f
then A has norm Q = b pb j as an ideal, but its class lies in a class group of size at most H fj . Pigeonhole
gives a fiber of size at least 2m /H fj . Fix one η in that fiber. For every  in the fiber, A A−1
                                                                                                 η is principal;
write
                                        (α ) = A A−1
                                                    η ,    u = α /c(α ).
Then |σ(u )| = 1 for every complex embedding σ, since c becomes complex conjugation. At the selected
prime pair,
                                        vPs (u ) = 2(s − ηs ),
up to the corresponding sign convention, so the u ’s are distinct. Also the valuations are bounded below by
−2 at the selected primes and nonnegative elsewhere, so the rational integer Q2 clears all denominators:

                                                 Q2 u ∈ O K j .

Although there are fj primes above a fixed rational pb , multiplication by p2b clears denominator exponent 2
at all of them simultaneously. Archimedean scaling is therefore only exponential in fj , not quadratic in fj .
    The count becomes
                                     |Uj | ≥ exp((t log 2 − log H)fj ).
Write
                                              γ = t log 2 − log H.
Here log H = O(` log `), because the base root discriminant has logarithm O(` log `), whereas t  d2  `2 .
Taking ` large makes γ > 0.
   The cut-and-project averaging is straightforward. In the Minkowski space Vj ≃ Cfj , take the lattice
Λj = Q−2 OKj . For a bounded product window WR , let

                                             Xy = (y + Λj ) ∩ WR

for a random translate y in the torus Vj /Λj . If Dy counts ordered pairs (x, x + u) lying in the window with
u ∈ Uj , then by translation-invariance
                                                         f
                                            EDy = |Uj |ρRj E|Xy |,



                                                       118
                                                                                               f
where ρR is the one-coordinate overlap ratio for the disk/window. Choosing R large makes ρRj cost at most
e−γfj /2 , say, so some translate satisfies
                                              Dy ≥ eγfj /2 |Xy |.
After projecting to the first complex coordinate, this gives a planar set Pj with

                                                        1 γfj /2
                                             ν(Pj ) ≥     e      nj .
                                                        2
The packing estimate for Λj inside WR gives

                                                  nj ≤ eBfj

for a constant B depending on the fixed base and on Q, R. Hence

                                                ν(Pj ) ≥ nj1+δ

after weakening constants, with for instance δ = γ/(4B), once j is large enough. Since fj → ∞, also nj → ∞
along a subsequence of chosen cosets, and log log nj → ∞. For any fixed C, eventually C/ log log nj < δ.
    Split marked primes also remain compatible with analytic class-field bounds. In an infinite tower, primes
splitting completely do contribute to Tsfasman-Vlăduţ/Odlyzko type inequalities, but the contribution of a
rational prime p is small if p is huge. Chebotarev lets the marked primes lie arbitrarily far out. Their sizes
make Q and hence B enormous, so δ may be tiny, but it remains positive. That is enough for the asymptotic
comparison with C/ log log n.
    The class group itself in the layers can grow exponentially in fj , and indeed it must grow in a tower. But
the upper bound has exponent O(` log `), whereas the number of binary choices has exponent t log 2 ∼ `2 .
The split primes do not automatically force class number growth at rate t. The ideal classes of the ratios
P/cP land in a finite class group, and pigeonhole is exactly measuring the kernel.
    Kronecker does not apply in the wrong direction. Each u has all complex conjugates on the unit circle.
If it were an algebraic integer, Kronecker would make it a root of unity. But it is an S-unit with bounded
rational denominator, not an algebraic integer. Nonintegral examples with all conjugates on the unit circle
exist already in degree two: the roots of
                                                  2x2 + 3x + 2
have product 1 and both have modulus 1, but they are not algebraic integers. For the u , the leading
coeﬀicient of the minimal polynomial can grow like a power of Q with the degree. So Kronecker, Dobrowolski,
Northcott, and the usual height intuitions do not immediately forbid exponentially many of them. The
absolute logarithmic height is O(log Q), because the total denominator norm is exponential in the degree
and height divides by the degree.
    Nor is there an extremal graph contradiction. Many unit directions of multiplicative S-unit type may
lead to additive equations among directions, but the rank is itself growing linearly with fj , and S-unit
equation bounds of the form exponential in rank would still allow polynomially many coincidences in n. The
construction does not require many additive relations; it only requires that many translation vectors lie in
the same high-dimensional lattice and that a window have the expected overlap.
    The p = 2 arithmetic retains real-place language, narrow class groups, possible Wang-type nuisances,
and softened relation-rank constants. Try changing the tower prime instead. Take p = 3.
    For an odd prime p0 , say p0 = 3, build cyclic p0 -extensions of Q with many ramified primes and a large
unramified genus field. Choose distinct rational primes ri ≡ 1 mod p0 . For each ri , let Li be the unique
cyclic degree p0 subfield of Q(ζri ); it is totally real because complex conjugation has order 2 and maps
trivially to an odd-order quotient. Let
                                                 M = L1 · · · L` ,
so Gal(M/Q) ≃ (Z/p0 )` . Take F to be the diagonal cyclic degree p0 subfield, the one cut out by the product
character. Its conductor is                         Y
                                               D=       ri .
                                                         i




                                                     119
For p0 = 3, the conductor-discriminant formula gives

                                                  |DF | = D2 .

For M , each ri appears in the conductor of exactly (p0 − 1)p0`−1 nontrivial characters; in the cubic case this
says
                                                           ℓ−1
                                              |DM | = D2·3 .
But [M : F ] = 3`−1 , so
                                                               ℓ−1
                                         |DF |[M :F ] = D2·3         = |DM |.
Thus the relative discriminant of M/F is 1: M/F is unramified at finite primes. It is totally real. Therefore
the maximal unramified pro-3 group G of F has generator rank

                                                 d(G) ≥ ` − 1.

The root discriminant of F has logarithm O(` log `), just as before.
   For odd p, there is no nontrivial local pro-p extension of R, so every unramified pro-p extension of a
totally real field remains totally real automatically. The Shafarevich relation estimate is also the standard
odd-prime one. Choose t  d2 rational primes splitting completely in the Frattini quotient field and in Q(i);
each such rational prime splits into 3 primes of the cubic base field F , so kill 3t Frobenius elements. If

                                                 t = bd2 /1000c,

then
                                           r(G) ≤ r(G) + 3t < d2 /4
for large d, provided r(G) ≤ d + O(1) or even O(d). Frobenius is in Φ(G) because of splitting in the Frattini
quotient, so the generator rank is unchanged, and Golod-Shafarevich again gives an infinite tower in which
the marked rational primes split completely.
    Once that tower exists, the CM and geometric steps can be reused without change: take layers Fj , set
Kj = Fj (i), use the split primes to build the A , pigeonhole in Cl(Kj ), obtain the norm-one S-units u , and
project the model set.
    For the cubic choice, the discriminant bookkeeping becomes very explicit:
                                                                           ℓ−1
                                       |DF | = D2 ,      |DM | = D2·3            ,

so M/F is unramified and d(G) ≥ ` − 1. For the maximal unramified pro-p group over F , with p odd,
Shafarevich gives the relation bound

                                       r(G) − d(G) ≤ r1 + r2 − 1 + · · ·

which in this fixed-degree totally real cubic case is just O(1).
   At infinite places, if L/F is a Galois extension of odd p-power degree and v is a real place of F , then
the decomposition group at a place above v maps into Gal(C/R), which has order 2. For odd p that map
must be trivial. Equivalently, locally over R there is no complex completion in a Galois odd p-extension. So
every finite layer in an unramified pro-p tower over a totally real field is again totally real. This removes the
dyadic infinite-prime nuisance entirely.
   The CM step does not care which prime governs the tower. The extension used later is still quadratic by
adjoining i, and the sign choices in the ideal construction are still binary because Kj /Fj is quadratic.
   Fix an odd prime p0 , perhaps eventually 3. Choose   Q rational primes ri ≡ 1 (mod p0 ). For each ri , take
the cyclic degree p0 subfield Li ⊂ Q(ζri ). Let M = Li . Choose a degree p0 subfield F of M such that
M/F is unramified and elementary abelian of rank ` − 1.                   Q
   This is the usual genus-field discriminant cancellation. Let D = ri . Each Li has conductor ri . The
character group of M is (Z/p0 )` . The discriminant of M is the product of conductors of all nontrivial
characters. For a fixed ri , the number of characters with nonzero i-component is (p0 − 1)p`−1   0 , so
                                                                     ℓ−1
                                             |DM | = D(p0 −1)p0 .

                                                       120
    Choose F to be the cyclic degree p0 field corresponding to the diagonal character, say generated by
χ1 · · · χ` . Its nontrivial characters all have conductor D, so

                                                  |DF | = Dp0 −1 .
   Then
                                                                ℓ−1
                                        |DF |[M :F ] = D(p0 −1)p0         = |DM |,
    and by the relative discriminant formula M/F has relative discriminant 1. Thus it is unramified at all
finite primes. Since everything is totally real, no infinite problem occurs either. This is cleaner than the
2-genus-field construction.
    Then the maximal unramified pro-p0 group G of F has generator rank d ≥ ` − 1, because M/F gives an
elementary abelian unramified p0 -extension of that rank. Shafarevich gives the relation rank

                                                r(G) ≤ d(G) + C,
    where C depends only on the base degree, hence only on p0 . More concretely, since F has degree p0 , the
unit rank is p0 − 1, and ζp0 ∈/ F because F is totally real and p0 is odd. So a bound r ≤ d + p0 or d + O(1)
is more than enough.
    For marked primes, let E be the Frattini quotient field, i.e. the finite elementary abelian extension fixed
by Φ(G). Choose rational primes qb splitting completely in the normal closure of E(i). Then they split
completely in F , and also in Q(i). Since F/Q has degree p0 , each qb gives p0 primes of F . The Frobenius at
each of those primes maps trivially in G/Φ(G), hence lies in Φ(G).
    If t rational primes are marked, kill p0 t Frobenius elements. Choose, say,
                                                             
                                                          d2
                                                  t=
                                                       1000p0
   or any small constant multiple of d2 /p0 . Then

                                                  r + p0 t < d2 /4
    for large d. Since the killed elements lie in the Frattini subgroup, the generator rank stays d, and the
relation rank goes up by at most p0 t. Golod-Shafarevich then forces the quotient to be infinite. In that
quotient the marked primes split completely in every layer.
    This clears away the narrow-class bookkeeping and the p = 2 real-place issue. The only remaining
quadratic piece is the later CM extension Kj = Fj (i).
    Now set p0 = 3. Then F is a cyclic cubic field, M/F has degree 3`−1 , and 3t Frobenii are killed. The
discriminants become especially simple:
                                                                              ℓ−1
                                        |DF | = D2 ,      |DM | = D2·3              .
     Also r(G) ≤ d(G) + 3, up to harmless constants. If t = bd /100c, then 3t ≈ 0.03d2 , safely below d2 /4.
                                                                          2

Even if the linear constant in Shafarevich is a little different, it is negligible. One can use 1/1000 for more
margin; constants do not matter. The later gain is t log 2, so any fixed positive multiple of `2 dominates the
class-number term.
     The local arithmetic in the cubic construction is explicit. For every ri ≡ 1 (mod 3), there is a cyclic
cubic subfield Li of Q(ζri ). It is totally real: the quotient has odd order, so complex conjugation dies. Its
conductor is ri and its discriminant
                            Q         is ri2 . If the diagonal cubic field F is taken, the two nontrivial characters
both have conductor D = ri , hence discriminant D2 . In the full compositum M , each ri appears in exactly
2 · 3`−1 nontrivial characters, so the exponent is 2 · 3`−1 . Therefore the relative discriminant really is trivial:
                                                            [M :F ]
                                                  DM = DF             .
   This also handles primes over 3, since ri 6= 3 and the conductors are prime to 3. At primes ri , the
ramified cubic part is already present in F ; the extra directions in M/F are unramified.
   The root discriminant of F is


                                                        121
                                                  rd(F ) = D2/3 .
    If the ri are chosen among the first primes 1 mod 3, then log D = O(` log `). PNT in arithmetic progres-
sions gives this conveniently; even a weaker bound would be enough. Thus the later class-number base has
log H` = O(` log `).
    After adjoining i in the tower, a uniform root discriminant bound holds for Kj = Fj (i). Since Fj /F is
unramified at finite primes, rd(Fj ) = rd(F ). At the prime 2, F/Q is unramified because the conductor D
is odd. The local fields in the tower over 2 are unramified extensions of the finitely many completions of
F at 2. Adjoining i has bounded relative discriminant per local degree. In fact the polynomial x2 + 1 has
discriminant −4, so a crude global bound “relative discriminant divides (4)” is enough. Hence

                                                rd(Kj ) ≤ C rd(F ),
   with C absolute or at least independent of j. For fixed `, this gives a bounded root discriminant family.
   The class number bound is then standard. For a degree n field with root discriminant ≤ A, Minkowski
says every ideal class has an integral ideal of norm ≤ CA  n
                                                             , and the number of ideals of norm ≤ CA   n
                                                                                                          is
≤ exp(OA (n)). For the fields Kj ,
                                                                 f
                                                  h(Kj ) ≤ H` j ,
   where fj = [Fj : Q] and

                                                log H` = O(` log `).
    Since Kj has degree 2fj , the factor of 2 is absorbed into H` .
    The CM direction construction in this p = 3 tower is unchanged. The marked rational primes q1 , . . . , qt
split completely in every Fj , and because they were chosen splitting in E(i), they are also 1 mod 4. Thus in

                                                    Kj = Fj (i)
   each qb splits completely, and over each prime of Fj there are two conjugate primes in Kj . There are

                                                       m = tfj
   conjugate pairs (Ps , Ps ).
   For every sign vector  ∈ {0, 1}m , define
                                                       Y         1−s
                                                A =       Pss Ps      .
                                                       s
                                                      Q f
   All these ideals have the same norm, namely b qb j , but the norm is not the important part. By
pigeonhole in the ideal class group of Kj , a fibre has size at least

                                    2m /h(Kj ) ≥ exp((t log 2 − log H` )fj ).
   Fix one representative η in that fibre. For every  in the same fibre, choose α with

                                                  (α ) = A A−1
                                                              η ,

   and put
                                                             α
                                                    u =
                                                            c(α )
   where c is the CM involution. Then for every complex embedding σ,

                                                   |σ(u )| = 1,
   because σ(cα) is the complex conjugate of σ(α).


                                                           122
   Distinctness is by valuations. At Ps ,

                                            vPs (u ) = 2(s − ηs ).
   So different ’s give different u ’s. Also the valuations are between −2 and 2 at the marked primes and
zero elsewhere, so if

                                                       Y
                                                       t
                                                  Q=         qb ,
                                                       b=1

   then

                                                 Q2 u ∈ O K j .
    Kronecker does not apply: these u ’s are not algebraic integers in general; they are S-units with a fixed
rational denominator. They can have all conjugates on the unit circle without being roots of unity.
    The exponent is

                                            γ` = t log 2 − log H` .
   Since t  d2  `2 and log H` = O(` log `), choose ` large enough that γ` > 0. Then

                                               |Uj | ≥ exp(γ` fj )
   for a set Uj of such unit-modulus S-units in Q−2 OKj .
   The geometric averaging also transfers unchanged. Let
                                                     Y
                                              Vj =        C
                                                      τ :Fj ,→R

    after choosing one complex embedding of Kj above each real embedding of Fj . This is real dimension
2fj . Let

                                                Λj = Q−2 OKj
    embedded diagonally in Vj . Each u ∈ Uj has every coordinate of modulus 1.
    Take a large polydisc/window WR , or a product of discs of radius R, and average over translates y + WR
in the torus Vj /Λj . Let

                                            Xy = (y + WR ) ∩ Λj
    or equivalently the set of lattice points in the translate. Let Dy count directed pairs (x, x + u) lying in
Xy , with u ∈ Uj . The averaging gives
                                                            f
                                            EDy = |Uj | ρRj E|Xy |,
    where ρR → 1 as R → ∞; more concretely ρR is the one-coordinate overlap area of two radius-R discs
with centers distance 1, divided by πR2 . Because all coordinates of u have modulus 1, the overlap volume
is the fj -th power of the same factor.
    Choose R large enough, for this j, that ρRj ≥ e−γℓ fj /2 . Then some translate satisfies
                                             f



                                              Dy ≥ eγℓ fj /2 |Xy |.
   The chosen translate is nonempty: if all nonempty translates had smaller ratio, the average would fail.
   Next project to one complex coordinate. If two algebraic numbers have the same value under one
embedding, their difference maps to 0, and a field embedding is injective; hence they are equal. So the
projection is injective on Xy . Moreover, every counted pair differs by some u ∈ Uj , whose chosen coordinate
has modulus 1. Thus after projection to C ∼  = R2 , there are nj = |Xy | distinct points and at least



                                                      123
                                                  1 γℓ fj /2
                                                    e        nj
                                                  2
   unit-distance unordered edges. The factor 2 converts directed pairs to unordered pairs.
   An upper bound on nj exponential in fj follows from packing. If λ ∈ Λj \ {0}, then β = Q2 λ is a nonzero
algebraic integer. Its norm is a nonzero integer, so
                                     Y
                                          |σ(λ)| = |NKj /Q (λ)|1/2 ≥ Q−2fj .
                                   σ chosen

   Therefore some chosen coordinate has |σ(λ)| ≥ Q−2 . The lattice points are separated in the sup norm
by Q−2 . A product of discs of radius R contains at most (CR Q2 )2fj such points. Thus

                                                   nj ≤ eBfj
   for a constant B depending on `, the marked primes, and R, but not on j.
   Combining the lower and upper bounds gives a fixed δ > 0. For instance, after absorbing the factor 1/2,
                                                                     γ`
                                          ν(Pj ) ≥ n1+δ
                                                    j   ,      δ=       ,
                                                                     4B
    for all large j. Since the marked quotient tower is infinite, fj → ∞, and the packing lower ratio also
gives nj → ∞. Thus there are arbitrarily large planar point sets with a fixed power saving over linear.
    The extension M/F is Galois with group the hyperplane kernel of the diagonal quotient, so (Z/3)`−1 .
The discriminant equality implies finite unramified. Infinite places are real because all fields are subfields of
cyclotomic fields fixed by odd quotients.
    The maximal unramified pro-3 group G has finite generator rank: its abelianization is the 3-class group.
The field E fixed by Φ(G) is finite. If a rational prime q splits completely in the normal closure of E(i), then
all three primes of F above q split in E/F . Hence their Frobenius elements are in Φ(G). All three must be
killed, not just one, because the tower quotient need not be stable under the cubic automorphism over Q.
The count 3t of relators includes this.
    Killing an element in the Frattini subgroup does not change the generator rank, by Burnside basis. Adding
3t normal relations increases relation rank by at most 3t. For a finite pro-p group, Golod-Shafarevich gives
r > d2 /4. Therefore if r + 3t < d2 /4, the quotient is infinite. In the quotient, a prime’s decomposition group
in the unramified extension is topologically generated by its Frobenius; killing that element makes the prime
split completely in every finite subextension.
    Choose the marked rational primes away from 2, 3, ri , which Chebotarev can do while avoiding finitely
many primes. Splitting in i gives q ≡ 1 mod 4, which ensures the CM split pairs in every Kj .
    For the maximal unramified pro-3 extension of a totally real cubic F , and since ζ3 ∈  / F , Shafarevich gives
something like

                                              r(G) − d(G) ≤ r1 + r2
   or even r1 + r2 − 1. The exact constant is not needed; write r ≤ d + C0 . Since d ≥ ` − 1, choosing ` large
and t = bd2 /100c gives

                                                 r + 3t < d2 /4.
    No total-real condition is needed in the definition of the tower; for odd p it is automatic.
    For Kj , the tower Fj /F is unramified at finite primes, so root discriminant is exactly constant for Fj .
Adjoining i may ramify at 2, but F is unramified at 2, and in any case the relative discriminant of adjoining
a root of x2 + 1 is bounded by the ideal generated by 4. Taking 1/[Kj : Q]-powers gives a constant factor.
    The class number bound does not need Brauer-Siegel asymptotics; just a crude exponential-in-degree
upper bound from bounded root discriminant. So log H` is proportional to log rd(Kj ), hence O(` log `). This
is dominated by t log 2, because t is quadratic in `.
    There is plenty of slack in the constants. Let t be bd2 /100c or bd2 /1000c; either way γ = t log 2−log H` >
0. The marked Chebotarev primes may be enormous, so B may be enormous and δ tiny. That is irrelevant:



                                                       124
δ is fixed after ` and the marked primes are fixed, and fj → ∞. A fixed positive δ is enough to contradict
any n1+C/ log log n upper bound along the resulting sequence, because eventually C/ log log nj < δ/2.
    The point-set sizes nj are not prescribed. That is fine for a negative resolution; an infinite sequence
nj → ∞ with ν(nj ) ≥ n1+δ  j   already refutes any eventual n1+o(1) upper bound of the proposed form. If
constants C, N existed, the bound would apply to these nj for all suﬀiciently large j, contradicting the fixed
exponent.
    So the cubic route keeps the later CM and geometric steps while removing the narrow-class and real-place
complications of the dyadic route.




                                                     125
