import supabase from '../config/supabase.js';

export const serviceService = {
  async createService(serviceData, providerId) {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('college_id')
      .eq('id', providerId)
      .single();
      
    let collegeId = profile?.college_id;
    if (!collegeId) {
      const { data: defaultCollege } = await supabase
        .from('colleges')
        .select('id')
        .limit(1)
        .single();
      collegeId = defaultCollege?.id;
    }
    
    if (!collegeId) {
      throw new Error('No college available. Please contact admin.');
    }
    
    const { title, description, category, pricing_model, price } = serviceData;

    const serviceToInsert = {
      provider_id: providerId,
      college_id: collegeId,
      title,
      description,
      category,
      pricing_model: pricing_model || 'hourly',
      price: parseFloat(price) || 0,
      is_active: true,
    };

    const { data: service, error } = await supabase
      .from('services')
      .insert(serviceToInsert)
      .select()
      .single();

    if (error) throw error;
    return service;
  },

  async addServiceImages(serviceId, imageUrls) {
    const images = imageUrls.map((url, index) => ({
      service_id: serviceId,
      image_url: url,
      is_primary: index === 0,
    }));

    const { data, error } = await supabase
      .from('service_portfolio_images')
      .insert(images)
      .select();

    if (error) throw error;
    return data;
  },

  async getServices(filters = {}, page = 1, limit = 20) {
    const { search, category, pricing_model, college_id, is_active } = filters;
    const offset = (page - 1) * limit;

    // First, fetch services with safe relationships
    let query = supabase
      .from('services')
      .select(`
        *,
        provider:profiles!provider_id(id, full_name, avatar_url, trust_score),
        images:service_portfolio_images(*)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    if (category) {
      query = query.eq('category', category);
    }

    if (pricing_model) {
      query = query.eq('pricing_model', pricing_model);
    }

    if (college_id) {
      query = query.eq('college_id', college_id);
    }

    if (is_active !== undefined) {
      query = query.eq('is_active', is_active);
    }

    const { data: services, error, count } = await query;

    if (error) {
      console.error('Services query error:', error);
      throw error;
    }

    // Safely fetch reviews separately
    let servicesWithRatings = services;
    if (services && services.length > 0) {
      try {
        const serviceIds = services.map(s => s.id);
        const { data: reviews, error: reviewError } = await supabase
          .from('service_reviews')
          .select('service_id, rating')
          .in('service_id', serviceIds);

        if (!reviewError && reviews) {
          // Merge reviews with services
          servicesWithRatings = services.map(service => {
            const serviceReviews = reviews.filter(r => r.service_id === service.id);
            const ratings = serviceReviews.map(r => r.rating);
            const avgRating = ratings.length > 0 
              ? ratings.reduce((a, b) => a + b, 0) / ratings.length 
              : 0;
            return {
              ...service,
              average_rating: avgRating,
              review_count: ratings.length,
            };
          });
        } else {
          console.warn('Reviews fetch failed, returning services without ratings:', reviewError?.message);
          // Return services with default rating values
          servicesWithRatings = services.map(service => ({
            ...service,
            average_rating: 0,
            review_count: 0,
          }));
        }
      } catch (reviewFetchError) {
        console.warn('Review fetch error, continuing without reviews:', reviewFetchError.message);
        servicesWithRatings = services.map(service => ({
          ...service,
          average_rating: 0,
          review_count: 0,
        }));
      }
    }

    return {
      data: servicesWithRatings,
      total: count,
      page,
      limit,
    };
  },

  async getServiceById(serviceId) {
    // First, fetch service with safe relationships
    const { data: service, error } = await supabase
      .from('services')
      .select(`
        *,
        provider:profiles!provider_id(id, full_name, avatar_url, phone, trust_score, bio),
        images:service_portfolio_images(*)
      `)
      .eq('id', serviceId)
      .single();

    if (error) {
      console.error('Service fetch error:', error);
      throw error;
    }

    // Safely fetch reviews separately
    try {
      const { data: reviews, error: reviewError } = await supabase
        .from('service_reviews')
        .select(`
          *,
          reviewer:profiles!reviewer_id(full_name, avatar_url)
        `)
        .eq('service_id', serviceId);

      if (!reviewError && reviews) {
        const ratings = reviews.map(r => r.rating);
        const avgRating = ratings.length > 0 
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length 
          : 0;

        return {
          ...service,
          reviews,
          average_rating: avgRating,
          review_count: ratings.length,
        };
      } else {
        console.warn('Reviews fetch failed for service:', serviceId, reviewError?.message);
        return {
          ...service,
          reviews: [],
          average_rating: 0,
          review_count: 0,
        };
      }
    } catch (reviewFetchError) {
      console.warn('Review fetch error for service:', serviceId, reviewFetchError.message);
      return {
        ...service,
        reviews: [],
        average_rating: 0,
        review_count: 0,
      };
    }
  },

  async getMyServices(providerId) {
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        images:service_portfolio_images(*),
        bookings:service_bookings(id, status)
      `)
      .eq('provider_id', providerId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(service => ({
      ...service,
      booking_count: service.bookings?.length || 0,
      pending_bookings: service.bookings?.filter(b => b.status === 'pending').length || 0,
    }));
  },

  async updateService(serviceId, providerId, updates) {
    const { data: service, error: checkError } = await supabase
      .from('services')
      .select('provider_id')
      .eq('id', serviceId)
      .single();

    if (checkError) throw checkError;

    if (service.provider_id !== providerId) {
      throw new Error('Unauthorized to update this service');
    }

    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', serviceId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteService(serviceId, providerId) {
    const { data: service, error: checkError } = await supabase
      .from('services')
      .select('provider_id')
      .eq('id', serviceId)
      .single();

    if (checkError) throw checkError;

    if (service.provider_id !== providerId) {
      throw new Error('Unauthorized to delete this service');
    }

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', serviceId);

    if (error) throw error;
    return { message: 'Service deleted successfully' };
  },

  async toggleActive(serviceId, providerId) {
    const { data: service, error: checkError } = await supabase
      .from('services')
      .select('provider_id, is_active')
      .eq('id', serviceId)
      .single();

    if (checkError) throw checkError;

    if (service.provider_id !== providerId) {
      throw new Error('Unauthorized');
    }

    const { data, error } = await supabase
      .from('services')
      .update({ is_active: !service.is_active })
      .eq('id', serviceId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
