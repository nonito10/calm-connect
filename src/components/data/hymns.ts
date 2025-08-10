/**
 * hymns.ts
 * Minimal selection of public-domain hymns for demo with lyrics.
 */

export interface Hymn {
  /** Hymn number or id */
  number: number
  /** Title */
  title: string
  /** Lyric body text */
  lyrics: string
}

export const hymns: Hymn[] = [
  {
    number: 1,
    title: "Amazing Grace",
    lyrics:
      "Amazing grace! how sweet the sound\nThat saved a wretch like me!\nI once was lost, but now am found;\nWas blind, but now I see.\n\n'Twas grace that taught my heart to fear,\nAnd grace my fears relieved;\nHow precious did that grace appear\nThe hour I first believed!\n\nThrough many dangers, toils, and snares,\nI have already come;\n'Tis grace hath brought me safe thus far,\nAnd grace will lead me home.",
  },
  {
    number: 2,
    title: "Holy, Holy, Holy",
    lyrics:
      "Holy, holy, holy! Lord God Almighty!\nEarly in the morning our song shall rise to Thee;\nHoly, holy, holy! merciful and mighty!\nGod in three Persons, blessed Trinity!\n\nHoly, holy, holy! all the saints adore Thee,\nCasting down their golden crowns around the glassy sea;\nCherubim and seraphim falling down before Thee,\nWhich wert, and art, and evermore shalt be.",
  },
  {
    number: 3,
    title: "What a Friend We Have in Jesus",
    lyrics:
      "What a friend we have in Jesus,\nAll our sins and griefs to bear!\nWhat a privilege to carry\nEverything to God in prayer!\n\nO what peace we often forfeit,\nO what needless pain we bear,\nAll because we do not carry\nEverything to God in prayer.",
  },
]
