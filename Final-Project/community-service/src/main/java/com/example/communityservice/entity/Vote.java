package com.example.communityservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "votes")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Builder
@Getter
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long voteId;
    private long userId;
    private boolean upVote;
    private boolean downVote;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;


}
