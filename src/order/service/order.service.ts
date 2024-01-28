import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from '../dto/order.dto';
import { OrderModel } from '../model/order.model';

describe('OrderService', () => {
  let service: OrderService;
  let repository: Repository<OrderModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(OrderModel),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    repository = module.get<Repository<OrderModel>>(getRepositoryToken(OrderModel));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an order', async () => {
      const createOrderDTO: CreateOrderDTO = {
        // Mocking data for testing
        // You can add more properties as needed
        externalId: 'test_external_id',
        // Add other properties here
      };

      // Mocking the 'save' method of the orderModelRepository
      jest.spyOn(repository, 'save').mockResolvedValueOnce(createOrderDTO as OrderModel);

      const result = await service.create(createOrderDTO);

      expect(repository.save).toHaveBeenCalledWith(createOrderDTO, undefined);
      expect(result).toEqual(createOrderDTO);
    });
  });

  describe('getByExternalId', () => {
    it('should get an order by externalId', async () => {
      const externalId = 'test_external_id';
      const orderModel: OrderModel = {
        // Mocking data for testing
        // You can add more properties as needed
        externalId: 'test_external_id',
        // Add other properties here
      };

      // Mocking the 'findOneBy' method of the orderModelRepository
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(orderModel);

      const result = await service.getByExternalId(externalId);

      expect(repository.findOneBy).toHaveBeenCalledWith({ externalId });
      expect(result).toEqual(orderModel);
    });
  });

  describe('setTransaction', () => {
    it('should set the transaction', () => {
      const transaction = { /* your test data */ };

      const result = service.setTransaction(transaction);

      expect(service.transaction).toEqual(transaction);
      expect(result).toEqual(service);
    });
  });
});