import { Request, Response } from 'express';
import { LocationRepository } from '../../infrastructure/repositories/LocationRepository';

export const getAllLocations = async (req: Request, res: Response): Promise<void> => {
  try {
    const locations = await LocationRepository.findAll();
    
    res.status(200).json({
      success: true,
      data: locations,
      message: 'All locations retrieved successfully'
    });
  } catch (error) {
    console.error('Error getting all locations:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const getLocationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const location = await LocationRepository.findById(id);

    if (!location) {
      res.status(404).json({
        success: false,
        message: 'Location not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: location,
      message: 'Location retrieved successfully'
    });
  } catch (error) {
    console.error('Error getting location by id:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const searchLocations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { country, state, city, address } = req.query;
    
    const filters: any = {};
    if (country) filters.country = country as string;
    if (state) filters.state = state as string;
    if (city) filters.city = city as string;
    if (address) filters.address = address as string;

    const locations = await LocationRepository.findByLocationFilters(filters);
    
    res.status(200).json({
      success: true,
      data: locations,
      message: 'Locations searched successfully'
    });
  } catch (error) {
    console.error('Error searching locations:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};
