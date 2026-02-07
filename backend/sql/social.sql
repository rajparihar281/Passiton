-- Reviews
create table public.reviews (
    id uuid primary key default gen_random_uuid(),
    transaction_id uuid references public.transactions(id) not null,
    reviewer_id uuid references public.profiles(id) not null,
    reviewee_id uuid references public.profiles(id) not null,
    rating integer check (rating between 1 and 5),
    comment text,
    created_at timestamp with time zone default now()
);

-- Chat Conversations
create table public.conversations (
    id uuid primary key default gen_random_uuid(),
    item_id uuid references public.items(id), -- Optional: links chat to an item
    created_at timestamp with time zone default now()
);

-- Chat Participants (Many-to-Many)
create table public.conversation_participants (
    conversation_id uuid references public.conversations(id) on delete cascade,
    user_id uuid references public.profiles(id) on delete cascade,
    primary key (conversation_id, user_id)
);

-- Messages
create table public.messages (
    id uuid primary key default gen_random_uuid(),
    conversation_id uuid references public.conversations(id) on delete cascade,
    sender_id uuid references public.profiles(id) on delete cascade,
    content text not null,
    created_at timestamp with time zone default now()
);

-- Indexes
create index messages_conversation_idx on public.messages(conversation_id);

-- Enable Security
alter table public.reviews enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_participants enable row level security;
alter table public.messages enable row level security;